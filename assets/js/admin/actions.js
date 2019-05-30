const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'x-expires': window.expiration
};


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
