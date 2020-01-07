import { commonThunk } from '../../Actions';

export function fetchAllowedRuns(eventId) {
  return commonThunk(
    {
      method: 'get',
      path: `/api/v1/events/${eventId}/allowed-runs`,
    },
    (dispatch, response) => {
      dispatch(receiveAllowedRuns(response.games, response.categories));
    }
  );
}

export function fetchRunnerSubmission(eventId) {
  return commonThunk(
    {
      method: 'get',
      path: `/api/v1/events/${eventId}/submission/`,
    },
    (dispatch, response) => {
      dispatch(receiveRunnerSubmission(response.submission));
      dispatch(receiveRunSubmissions(response.runs));
    }
  );
}

export function createRunnerSubmission(eventId, { maxGames, maxTime, pairWith, avoid, captain }) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/events/${eventId}/submission`,
      body: {
        /* eslint-disable camelcase */
        max_games: maxGames,
        max_time: maxTime,
        pair_with: pairWith,
        /* eslint-enable camelcase */
        avoid: avoid,
        captain: captain,
      },
    },
    (dispatch, response) => {
      dispatch(receiveRunnerSubmission(response.submission));
    }
  );
}

export function updateRunnerSubmission(eventId, { maxGames, maxTime, pairWith, avoid, captain }) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/events/${eventId}/submission/update`,
      body: {
        /* eslint-disable camelcase */
        max_games: maxGames,
        max_time: maxTime,
        pair_with: pairWith,
        /* eslint-enable camelcase */
        avoid: avoid,
        captain: captain,
      },
    },
    (dispatch, response) => {
      dispatch(receiveRunnerSubmission(response.submission));
    }
  );
}

export function revokeRunnerSubmission(eventId) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/events/${eventId}/submission/revoke`,
    },
    (dispatch, response) => {
      dispatch(receiveRunnerSubmission(response.submission));
    }
  );
}

export function unrevokeRunnerSubmission(eventId) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/events/${eventId}/submission/unrevoke`,
    },
    (dispatch, response) => {
      dispatch(receiveRunnerSubmission(response.submission));
    }
  );
}

export function deleteRunnerSubmission(eventId) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/events/${eventId}/submission/delete`,
    },
    (dispatch, response) => {
      dispatch(removeAllSubmissions());
    }
  );
}

export function createRunSubmission(eventId, { gameId, categoryId, pb, est }) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/events/${eventId}/submission/runs`,
      body: {
        /* eslint-disable camelcase */
        game_id: gameId,
        category_id: categoryId,
        pb_seconds: pb,
        est_seconds: est,
        /* eslint-enable camelcase */
      },
    },
    (dispatch, response) => {
      dispatch(receiveRunSubmissions([response.run]));
    }
  );
}

export function updateRunSubmission(eventId, { id, gameId, categoryId, pb, est }) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/events/${eventId}/submission/runs/${id}`,
      body: {
        /* eslint-disable camelcase */
        game_id: gameId,
        category_id: categoryId,
        pb_seconds: pb,
        est_seconds: est,
        /* eslint-enable camelcase */
      },
    },
    (dispatch, response) => {
      dispatch(receiveRunSubmissions([response.run]));
    }
  );
}

export function deleteRunSubmission(eventId, id) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/events/${eventId}/submission/runs/${id}/delete`,
    },
    (dispatch, response) => {
      dispatch(removeRunSubmission(id));
    }
  );
}

function receiveAllowedRuns(games, categories) {
  return {
    type: 'SUBMISSIONS_RECEIVE_ALLOWED_RUNS',
    data: {
      games,
      categories,
    },
  };
}

function receiveRunnerSubmission(submission) {
  return {
    type: 'SUBMISSIONS_RECEIVE_RUNNER_SUBMISSION',
    data: {
      submission,
    },
  };
}

function receiveRunSubmissions(runs) {
  return {
    type: 'SUBMISSIONS_RECEIVE_RUNS',
    data: {
      runs,
    },
  };
}

function removeRunSubmission(runId) {
  return {
    type: 'SUBMISSIONS_DELETE_RUN',
    data: {
      runId,
    },
  };
}

function removeAllSubmissions() {
  return {
    type: 'SUBMISSIONS_DELETE_ALL_SUBMISSIONS',
    data: {},
  };
}
