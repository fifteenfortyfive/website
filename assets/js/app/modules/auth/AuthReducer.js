const defaultState = {
  sessionId: null,
  loaded: false,
};

const actions = {
  LOGIN_SUCCESS: (state, { data }) => {
    const { sessionId } = data;

    return {
      ...state,
      sessionId,
      loaded: true,
    };
  },

  LOGOUT_SUCCESS: (state, _action) => {
    return {
      ...state,
      sessionId: null,
      loaded: true,
    };
  },

  AUTH_FETCH_SUCCESS: (state, _action) => {
    return {
      ...state,
      loaded: true,
    };
  },
};

export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
