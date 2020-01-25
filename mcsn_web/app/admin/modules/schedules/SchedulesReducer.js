import _ from 'lodash';

const defaultState = {};

const actions = {
  'admin/RECEIVE_SCHEDULES': (state, { data }) => {
    const { schedules } = data;
    const schedulesById = _.reduce(
      schedules,
      (acc, schedule) => {
        acc[schedule.id] = schedule;
        return acc;
      },
      {}
    );

    return {
      ...state,
      ...schedulesById,
    };
  },
};

export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
