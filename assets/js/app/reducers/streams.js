const defaultState = {};

const actions = {
  'RECEIVE_STREAMS': (state, {data}) => {
    const {streams} = data;

    return {
      ...state,
      ...streams
    };
  },
};



export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
