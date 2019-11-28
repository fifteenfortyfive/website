import _ from 'lodash';

const defaultState = {};

const actions = {
  RECEIVE_EVENTS: (state, { data }) => {
    const { events } = data;
    const eventsById = _.reduce(
      events,
      (acc, event) => {
        acc[event.id] = event;
        return acc;
      },
      {},
    );

    return {
      ...state,
      ...eventsById,
    };
  },
};

export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
