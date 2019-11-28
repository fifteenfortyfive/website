import _ from 'lodash';

const defaultState = {};

const actions = {
  RECEIVE_RUNS: (state, { data }) => {
    const { runs } = data;
    const runsById = _.reduce(
      runs,
      (acc, run) => {
        acc[run.id] = run;
        return acc;
      },
      {},
    );

    return {
      ...state,
      ...runsById,
    };
  },
};

export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
