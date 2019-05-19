const defaultGame = {
  // DB-id for the game being submitted
  gameId: null,
  name: null,
  // Runner's PB time
  pb: null,
  // Runner's estimate
  est: null
};

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'x-expires': window.expiration
};


export function addGame() {
  return {
    type: 'ADD_GAME',
    data: {
      game: {...defaultGame}
    }
  };
}

export function removeGame(index) {
  return {
    type: 'REMOVE_GAME',
    data: {
      index
    }
  };
}

export function updateGame(index, field, value) {
  return {
    type: 'UPDATE_GAME',
    data: {
      index,
      field,
      value
    }
  };
}

export function toggleCaptain(yesno) {
  return {
    type: 'TOGGLE_CAPTAIN',
    data: {
      yesno
    }
  }
}

export function updateMaxGames(maxGames) {
  return {
    type: 'UPDATE_MAX_GAMES',
    data: {
      maxGames
    }
  };
}

export function updateMaxTime(maxTime) {
  return {
    type: 'UPDATE_MAX_TIME',
    data: {
      maxTime
    }
  };
}

export function updatePairWith(pairWith) {
  return {
    type: 'UPDATE_PAIR_WITH',
    data: {
      pairWith
    }
  };
}

export function updateAvoid(avoid) {
  return {
    type: 'UPDATE_AVOID',
    data: {
      avoid
    }
  };
}

export function startSubmission() {
  return {
    type: 'SUBMISSION_STARTED',
    data: {}
  }
}

export function submissionSucceeded() {
  return {
    type: 'SUBMISSION_SUCCEEDED',
    data: {}
  }
}

export function submissionFailed() {
  return {
    type: 'SUBMISSION_FAILED',
    data: {}
  }
}

export function receiveExistingSubmission(data) {
  return {
    type: 'RECEIVE_EXISTING_SUBMISSION',
    data
  };
}

export function fetchSubmissionData(eventId) {
  return dispatch => {
    dispatch(startSubmission());
    fetch(`/api/events/${eventId}/runner_submission`, {
      headers: defaultHeaders,
      method: 'GET'
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      if(response.exists) {
        return dispatch(receiveExistingSubmission(response.data));
      }
    });
  };
}

export function submit(eventId, state) {
  return dispatch => {
    dispatch(startSubmission());
    fetch(`/api/events/${eventId}/submit`, {
      headers: defaultHeaders,
      method: 'POST',
      body: JSON.stringify(state)
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      return dispatch(fetchSubmissionData(eventId));
    })
    .catch((response) => {
      return dispatch(submissionFailed());
    });
  };
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
