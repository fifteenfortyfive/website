import { commonThunk, denulled } from '../actions';

export function fetchAccountPreferences() {
  return commonThunk({
    method: 'get',
    path: '/api/v1/@me/account_preferences',
    name: '@me.account_preferences',
  }, (dispatch, response) => {
    dispatch(receiveAccountPreferences(
      response.account_preferences,
      response.descriptions
    ))
  });
}

export function persistAccountPreferences(preferences) {
  return commonThunk({
    method: 'post',
    path: '/api/v1/@me/account_preferences',
    name: 'sending.@me.account_preferences',
    body: preferences
  }, (dispatch, response) => {
    // nothing to do
  });
}


export function receiveAccountPreferences(preferences, descriptions) {
  return {
    type: 'RECEIVE_ACCOUNT_PREFERENCES',
    data: {
      preferences,
      descriptions
    }
  };
}


export function setPreference(preference, value) {
  return {
    type: 'SET_ACCOUNT_PREFERENCE',
    data: {
      preference,
      value
    }
  }
}
