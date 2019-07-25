import { commonThunk, denulled } from '../actions';

export function login(username, password) {
  return commonThunk({
    method: 'post',
    path: '/api/v1/sessions',
    name: 'login',
    body: {
      username,
      passsord
    },
  }, (dispatch, response) => {
    window.currentUserId = response.accountId;
    dispatch(loginSuccess(response.accountId))
  })
  .catch(loginFailure);
}

export function logout(accountId) {
  return commonThunk({
    method: 'post',
    path: `/api/v1/sessions/delete`,
    name: 'logout'
  }, (dispatch, response) => {
    dispatch(logoutSuccess());
  })
  .catch(logoutFailure);
}



export function loginSuccess(accountId) {
  return {
    type: 'LOGIN_SUCCESS',
    data: {
      accountId
    }
  };
}

export function loginFailure(error) {
  return {
    type: 'LOGIN_FAILURE',
    data: {
      error
    }
  };
}

export function logoutSuccess() {
  return {
    type: 'LOGOUT_SUCCESS',
    data: {}
  };
}

export function logoutFailure(error) {
  return {
    type: 'LOGOUT_FAILURE',
    data: {
      error
    }
  };
}
