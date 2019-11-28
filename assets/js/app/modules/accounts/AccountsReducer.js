import _ from 'lodash';

const defaultState = {};

const actions = {
  'RECEIVE_ACCOUNTS': (state, {data}) => {
    const {accounts} = data;
    const accountsById = _.reduce(accounts, (acc, account) => {
      acc[account.id] = account;
      return acc;
    }, {});

    return {
      ...state,
      ...accountsById
    };
  },
};



export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
