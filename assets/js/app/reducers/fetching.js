const defaultState = {};

const actions = {
  'FETCH_STARTED': (state, {data}) => {
    return {
      ...state,
      [data.fetchId]: true
    };
  },

  'FETCH_SUCCEEDED': (state, {data}) => {
    return {
      ...state,
      [data.fetchId]: false
    };
  },

  'FETCH_FAILED': (state, {data}) => {
    return {
      ...state,
      [data.fetchId]: 0
    };
  },
};



export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
