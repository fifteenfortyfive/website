import { commonThunk, denulled } from '../../actions';

export function fetchAllowedRuns(eventId) {
  return commonThunk({
    method: 'get',
    path: `/api/v1/events/${eventId}/allowed-runs`
  }, (dispatch, response) => {
    dispatch(receiveAllowedRuns(response.games, response.categories));
  });
}

export function fetchRunnerSubmission(eventId) {
  return commonThunk({
    method: 'get',
    path: `/api/v1/events/${eventId}/runner-submission`,
  }, (dispatch, response) => {
    dispatch(receiveRunnerSubmission(response.runner));
    dispatch(receiveRunSubmissions(response.runs));
  });
}

export function createRunnerSubmission(eventId, {maxGames, maxTime, pairWith, avoid, captain}) {
  return commonThunk({
    method: 'post',
    path: `/api/v1/events/${eventId}/runner-submission`,
    body: {
      max_games: maxGames,
      max_time: maxTime,
      pair_with: pairWith,
      avoid: avoid,
      captain: captain
    }
  }, (dispatch, response) => {
    dispatch(receiveRunnerSubmission(response.submission));
  });
}

export function updateRunnerSubmission(eventId, {maxGames, maxTime, pairWith, avoid, captain}) {
  return commonThunk({
    method: 'post',
    path: `/api/v1/events/${eventId}/runner-submission/update`,
    body: {
      max_games: maxGames,
      max_time: maxTime,
      pair_with: pairWith,
      avoid: avoid,
      captain: captain
    }
  }, (dispatch, response) => {
    dispatch(receiveRunnerSubmission(response.submission));
  });
}

export function revokeRunnerSubmission(eventId) {
  return commonThunk({
    method: 'post',
    path: `/api/v1/events/${eventId}/runner-submission/revoke`,
  }, (dispatch, response) => {
    dispatch(receiveRunnerSubmission(response.submission));
  });
}

export function unrevokeRunnerSubmission(eventId) {
  return commonThunk({
    method: 'post',
    path: `/api/v1/events/${eventId}/runner-submission/unrevoke`,
  }, (dispatch, response) => {
    dispatch(receiveRunnerSubmission(response.submission));
  });
}



function receiveAllowedRuns(games, categories) {
  return {
    type: 'SUBMISSIONS_RECEIVE_ALLOWED_RUNS',
    data: {
      games,
      categories
    }
  };
}

function receiveRunnerSubmission(submission) {
  return {
    type: 'SUBMISSIONS_RECEIVE_RUNNER_SUBMISSION',
    data: {
      submission
    }
  };
}

function receiveRunSubmissions(runs) {
  return {
    type: 'SUBMISSIONS_RECEIVE_RUNS',
    data: {
      runs
    }
  };
}
