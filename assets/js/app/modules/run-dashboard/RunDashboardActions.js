import { commonThunk, denulled } from '../../Actions';

export function fetchRuns(eventId, accountId) {
  return commonThunk(
    {
      method: 'get',
      path: `/api/v1/runs`,
      name: 'runs',
      query: denulled({
        event_id: eventId,
        account_id: accountId,
      }),
    },
    (dispatch, response) => {
      dispatch(receiveDashboardRuns(response.runs));
    }
  );
}

export function startRun(eventId, runId) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/events/${eventId}/runs/${runId}/start`,
      name: `runs.${runId}.start`,
    },
    (dispatch, response) => {
      dispatch(receiveDashboardRuns([response.run]));
    }
  );
}

export function finishRun(eventId, runId) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/events/${eventId}/runs/${runId}/finish`,
      name: `runs.${runId}.finish`,
    },
    (dispatch, response) => {
      dispatch(receiveDashboardRuns([response.run]));
    }
  );
}

export function resetRun(eventId, runId) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/events/${eventId}/runs/${runId}/reset`,
      name: `runs.${runId}.reset`,
    },
    (dispatch, response) => {
      dispatch(receiveDashboardRuns([response.run]));
    }
  );
}

export function resumeRun(eventId, runId) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/events/${eventId}/runs/${runId}/resume`,
      name: `runs.${runId}.resume`,
    },
    (dispatch, response) => {
      dispatch(receiveDashboardRuns([response.run]));
    }
  );
}

export function receiveDashboardRuns(runs) {
  return {
    type: 'RECEIVE_DASHBOARD_RUNS',
    data: {
      runs,
    },
  };
}
