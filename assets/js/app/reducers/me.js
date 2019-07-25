const defaultState = {
  account: {},
  preferences: {},
  preferenceDescriptions: {}
}

const actions = {
  'RECEIVE_ACCOUNT_PREFERENCES': (state, {data}) => {
    const {preferences, descriptions} = data;

    return {
      ...state,
      preferences,
      preferenceDescriptions: descriptions
    };
  },

  'SET_ACCOUNT_PREFERENCE': (state, {data}) => {
    const {preference, value} = data;

    return {
      ...state,
      preferences: {
        ...state.preferences,
        [preference]: value
      }
    };
  },

  'RECEIVE_ME': (state, {data}) => {
    const {account} = data;

    return {
      ...state,
      account
    };
  },

  'SET_ACCOUNT_DETAIL': (state, {data}) => {
    const {name, value} = data;

    return {
      ...state,
      account: {
        ...state.account,
        [name]: value
      }
    };
  },
};


export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
