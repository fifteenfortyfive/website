import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const defaultState = {
};

const reducerActions = {
  'START_SUBMISSION': (state, {data}) => {
    return {
      ...state,
      submitting: true
    };
  },
}

export function reducer(state = defaultState, action) {
  const func = reducerActions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}

export const store = createStore(reducer, applyMiddleware(thunk));
