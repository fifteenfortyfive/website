import { commonThunk, multipartThunk } from '../../Actions';

export function fetchMe() {
  return commonThunk(
    {
      method: 'get',
      path: '/api/v1/@me',
      name: '@me.account',
    },
    (dispatch, response) => {
      dispatch(receiveMe(response.account));
    }
  );
}

export function persistMe(account) {
  return commonThunk(
    {
      method: 'post',
      path: '/api/v1/@me',
      name: 'sending.@me',
      body: {
        account,
      },
    },
    (dispatch, response) => {
      dispatch(receiveMe(response.account));
    }
  );
}

export function uploadAvatar(avatar) {
  const formData = new FormData();
  formData.append('avatar', avatar);

  return multipartThunk(
    {
      method: 'post',
      path: '/api/v1/@me/avatar',
      name: 'sending.@me.avatar',
      body: formData,
    },
    (dispatch, response) => {
      dispatch(fetchMe());
    }
  );
}

export function fetchPreferences() {
  return commonThunk(
    {
      method: 'get',
      path: '/api/v1/@me/account_preferences',
      name: '@me.account_preferences',
    },
    (dispatch, response) => {
      dispatch(receivePreferences(response.account_preferences, response.descriptions));
    }
  );
}

export function persistPreferences(preferences) {
  return commonThunk(
    {
      method: 'post',
      path: '/api/v1/@me/account_preferences',
      name: 'sending.@me.account_preferences',
      body: preferences,
    },
    (dispatch, response) => {
      // nothing to do
    }
  );
}

export function receivePreferences(preferences, descriptions) {
  return {
    type: 'RECEIVE_ACCOUNT_PREFERENCES',
    data: {
      preferences,
      descriptions,
    },
  };
}

export function receiveMe(account) {
  return {
    type: 'RECEIVE_ME',
    data: {
      account,
    },
  };
}

export function setPreference(preference, value) {
  return {
    type: 'SET_ACCOUNT_PREFERENCE',
    data: {
      preference,
      value,
    },
  };
}

export function setAccountDetail(name, value) {
  return {
    type: 'SET_ACCOUNT_DETAIL',
    data: {
      name,
      value,
    },
  };
}
