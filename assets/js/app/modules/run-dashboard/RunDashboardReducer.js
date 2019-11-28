import _ from 'lodash';

const defaultState = {
  runs: {}
};

const actions = {
  'RECEIVE_DASHBOARD_RUNS': (state, {data}) => {
    const {runs} = data;
    const runsById = _.reduce(runs, (acc, run) => {
      acc[run.id] = run;
      return acc;
    }, {});

    return {
      ...state,
      runs: {
        ...state.runs,
        ...runsById
      }
    };
  },
};



export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
