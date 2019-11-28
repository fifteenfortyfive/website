import _ from 'lodash';

const defaultState = {
  sessionId: null,
};

const actions = {
  LOGIN_SUCCESS: (state, { data }) => {
    const { sessionId } = data;

    return {
      ...state,
      sessionId,
    };
  },

  LOGOUT_SUCCESS: (state, { data }) => {
    const { sessionId } = data;

    return {
      ...state,
      sessionId: null,
    };
  },
};

export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
