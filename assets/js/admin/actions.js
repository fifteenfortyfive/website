const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'x-expires': window.expiration
};


export function fetchAccounts() {
  return commonThunk({
    method: 'get',
    path: '/api/admin/accounts',
    name: 'accounts'
  }, (dispatch, response) => {
    dispatch(receiveAccounts(response))
  });
}

export function fetchGames() {
  return commonThunk({
    method: 'get',
    path: '/api/admin/games',
    name: 'games'
  }, (dispatch, response) => {
    dispatch(receiveGames(response))
  });
}

export function fetchEvents() {
  return commonThunk({
    method: 'get',
    path: '/api/admin/events',
    name: 'events'
  }, (dispatch, response) => {
    dispatch(receiveEvents(response))
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

export function receiveGames(games) {
  return {
    type: 'RECEIVE_GAMES',
    data: {
      games
    }
  };
}

export function receiveEvents(events) {
  return {
    type: 'RECEIVE_EVENTS',
    data: {
      events
    }
  };
}

export function fetchStarted(fetchId) {
  return {
    type: 'FETCH_STARTED',
    data: {fetchId}
  }
}

export function fetchSucceeded(fetchId) {
  return {
    type: 'FETCH_SUCCEEDED',
    data: {fetchId}
  }
}

export function fetchFailed(fetchId) {
  return {
    type: 'FETCH_FAILED',
    data: {fetchId}
  }
}


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300 || response.status == 422) {
    return response;
  } else {
    throw response;
  }
};

function parseJSON(response) {
  return response.json();
};


function commonThunk({method, path, name, body}, then) {
  const fetchId = path || name;

  return dispatch => {
    dispatch(fetchStarted(fetchId));
    fetch(path, {
      headers: defaultHeaders,
      method: method.toUpperCase(),
      credentials: 'include',
      body: JSON.stringify(body)
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      dispatch(fetchSucceeded(fetchId));
      then(dispatch, response);
    });
  };
}