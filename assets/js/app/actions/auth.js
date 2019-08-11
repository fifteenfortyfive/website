import { commonThunk, denulled } from '../actions';
import * as Cookies from 'js-cookie';

export function login(username, password) {
  return commonThunk({
    method: 'post',
    path: '/api/v1/sessions',
    name: 'login',
    body: {
      username,
      password
    },
  }, (dispatch, response) => {
    const { session_id: sessionId } = response;
    Cookies.set('1545_session_id', sessionId, { expires: 31 });
    dispatch(loginSuccess(response.sessionId))
  });
}

export function logout() {
  return commonThunk({
    method: 'post',
    path: `/api/v1/sessions/delete`,
    name: 'logout'
  }, (dispatch, response) => {
    Cookies.remove('1545_session_id');
    dispatch(logoutSuccess());
  });
}

export function loadSession() {
  return (dispatch) => {
    const existingSession = Cookies.get('1545_session_id');

    if(existingSession != null) {
      dispatch(loginSuccess(existingSession));
    }
  };
}



export function loginSuccess(sessionId) {
  return {
    type: 'LOGIN_SUCCESS',
    data: {
      sessionId
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
