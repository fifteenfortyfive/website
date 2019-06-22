import { commonThunk, denulled } from '../actions';

export function fetchMe() {
  return commonThunk({
    method: 'get',
    path: '/api/v1/@me',
    name: '@me.account',
  }, (dispatch, response) => {
    dispatch(receiveMe(response.account));
  });
}

export function persistMe(account) {
  return commonThunk({
    method: 'post',
    path: '/api/v1/@me',
    name: 'sending.@me',
    body: {
      account
    }
  }, (dispatch, response) => {
    dispatch(receiveMe(response.account));
  });
}


export function receiveMe(account) {
  return {
    type: 'RECEIVE_ME',
    data: {
      account
    }
  };
}
