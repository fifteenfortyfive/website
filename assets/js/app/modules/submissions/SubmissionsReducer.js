import _ from 'lodash';

const defaultState = {
  allowedRuns: {
    games: {},
    categories: {},
  },
  runner: null,
  runs: {},
};

const actions = {
  SUBMISSIONS_RECEIVE_ALLOWED_RUNS: (state, { data }) => {
    const { games, categories } = data;
    const gamesById = _.reduce(
      games,
      (acc, game) => {
        acc[game.id] = game;
        return acc;
      },
      {}
    );
    const categoriesById = _.reduce(
      categories,
      (acc, category) => {
        acc[category.id] = category;
        return acc;
      },
      {}
    );

    return {
      ...state,
      allowedRuns: {
        games: gamesById,
        categories: categoriesById,
      },
    };
  },

  SUBMISSIONS_RECEIVE_RUNNER_SUBMISSION: (state, { data }) => {
    const { submission } = data;

    return {
      ...state,
      runner: submission,
    };
  },

  SUBMISSIONS_RECEIVE_RUNS: (state, { data }) => {
    const { runs } = data;

    const runsById = _.reduce(
      runs,
      (acc, run) => {
        acc[run.id] = run;
        return acc;
      },
      {}
    );

    return {
      ...state,
      runs: {
        ...state.runs,
        ...runsById,
      },
    };
  },

  SUBMISSIONS_DELETE_RUN: (state, { data }) => {
    const { runId } = data;
    const { [runId]: _deletedRun, ...filteredRuns } = state.runs;

    return {
      ...state,
      runs: filteredRuns,
    };
  },

  SUBMISSIONS_DELETE_ALL_SUBMISSIONS: (state, { data }) => {
    return {
      ...state,
      runner: null,
      runs: [],
    };
  },
};

export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
