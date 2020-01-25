import _ from 'lodash';

const defaultState = {
  schedule: null,
  runs: {},
  runners: {},
  games: {},
  categories: {},
  event: null,
};

const actions = {
  'admin/RECEIVE_SCHEDULING_DATA': (state, { data }) => {
    const { schedule, runs, runners, games, categories, event } = data;
    const runsById = _.keyBy(runs, 'id');
    const runnersById = _.keyBy(runners, 'id');
    const gamesById = _.keyBy(games, 'id');
    const categoriesById = _.keyBy(categories, 'id');

    return {
      ...state,
      schedule,
      runs: runsById,
      runners: runnersById,
      games: gamesById,
      categories: categoriesById,
      event,
    };
  },

  'admin/RECEIVE_SCHEDULE': (state, { data }) => {
    const { schedule } = data;
    return {
      ...state,
      schedule,
    };
  },
};

export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
