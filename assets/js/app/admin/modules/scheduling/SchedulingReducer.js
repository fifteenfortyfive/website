import _ from 'lodash';

const defaultState = {
  schedule: null,
  runs: {},
};

const actions = {
  'admin/RECEIVE_SCHEDULE': (state, { data }) => {
    const { schedule } = data;

    return {
      ...state,
      schedule,
    };
  },
  'admin/RECEIVE_SCHEDULE_RUNS': (state, { data }) => {
    const { runs } = data;
    const runsById = _.keyBy(runs, 'id');

    return {
      ...state,
      runs: {
        ...state.runs,
        ...runsById,
      },
    };
  },
};

export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
