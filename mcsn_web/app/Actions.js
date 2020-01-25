import _ from 'lodash';
import { API_ENDPOINT } from './Constants';

const bareHeaders = {
  Accept: 'application/json',
};

export const defaultHeaders = {
  ...bareHeaders,
  'Content-Type': 'application/json',
};

const multipartHeaders = {
  ...bareHeaders,
};

export function fetchStarted(fetchId) {
  return {
    type: 'FETCH_STARTED',
    data: { fetchId },
  };
}

export function fetchSucceeded(fetchId) {
  return {
    type: 'FETCH_SUCCEEDED',
    data: { fetchId },
  };
}

export function fetchFailed(fetchId) {
  return {
    type: 'FETCH_FAILED',
    data: { fetchId },
  };
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw response;
  }
}

export function parseJSON(response) {
  return response.json();
}

export function commonThunk({ method, path, name, body, query }, then) {
  const fetchId = name || path;
  const url = `${API_ENDPOINT}${path}?${query ? params(query) : ''}`;

  return dispatch => {
    dispatch(fetchStarted(fetchId));
    return fetch(url, {
      headers: defaultHeaders,
      method: method.toUpperCase(),
      credentials: 'include',
      body: JSON.stringify(body),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(fetchSucceeded(fetchId));
        then(dispatch, response);
      })
      .catch(error => {
        dispatch(fetchFailed(fetchId));
        throw error;
      });
  };
}

export function multipartThunk({ method, path, name, body }, then) {
  const fetchId = name || path;

  return dispatch => {
    dispatch(fetchStarted(fetchId));
    return fetch(`${API_ENDPOINT}${path}`, {
      headers: multipartHeaders,
      method: method.toUpperCase(),
      credentials: 'include',
      body: body,
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(fetchSucceeded(fetchId));
        then && then(dispatch, response);
      })
      .catch(error => {
        dispatch(fetchFailed(fetchId));
        throw error;
      });
  };
}

export function denulled(object) {
  return _.reduce(
    object,
    (acc, value, key) => {
      if (value != null) acc[key] = value;
      return acc;
    },
    {}
  );
}

function params(data) {
  return Object.keys(data)
    .map(key => `${key}=${encodeURIComponent(data[key])}`)
    .join('&');
}
