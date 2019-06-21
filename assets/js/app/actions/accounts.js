import { commonThunk, denulled } from '../actions';

export function fetchAccounts(accountIds) {
  return commonThunk({
    method: 'get',
    path: '/api/v1/accounts',
    name: 'accounts',
    query: denulled({
      account_ids: accountIds
    })
  }, (dispatch, response) => {
    dispatch(receiveAccounts(response.accounts))
  });
}

export function fetchAccount(accountId) {
  return commonThunk({
    method: 'get',
    path: `/api/v1/accounts/${accountId}`,
    name: `accounts.${accountId}`,
    query: denulled({
      embed: 'runs'
    })
  }, (dispatch, response) => {
    dispatch(receiveAccounts([response.account]))
  });
}



export function receiveAccounts(accounts) {
  return {
    type: 'RECEIVE_ACCOUNTS',
    data: {
      accounts
    }
  };
}
