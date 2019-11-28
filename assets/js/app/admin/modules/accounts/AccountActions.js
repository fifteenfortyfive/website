import { commonThunk, denulled } from '../../../Actions';

export function fetchAccounts() {
  return commonThunk(
    {
      method: 'get',
      path: '/api/admin/accounts',
    },
    (dispatch, response) => {
      dispatch(receiveAccounts(response));
    },
  );
}

export function receiveAccounts(accounts) {
  return {
    type: 'admin/RECEIVE_ACCOUNTS',
    data: {
      accounts,
    },
  };
}
