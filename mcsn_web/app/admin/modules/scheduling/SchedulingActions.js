import { commonThunk } from '../../../Actions';

export function fetchSchedulingData(eventId) {
  return commonThunk(
    {
      method: 'get',
      path: `/api/v1/admin/events/${eventId}/scheduling`,
    },
    (dispatch, response) => {
      dispatch(receiveSchedulingData(response));
    }
  );
}

export function addRun(scheduleId, runId, index = 0) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/schedules/${scheduleId}/add-activity`,
      body: {
        // eslint-disable-next-line camelcase
        run_id: runId,
        index,
      },
    },
    (dispatch, response) => {
      dispatch(receiveSchedule(response));
    }
  );
}

export function updateActivity(scheduleId, activityId, changes) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/schedules/${scheduleId}/update-activity`,
      body: {
        // eslint-disable-next-line camelcase
        activity_id: activityId,
        changes,
      },
    },
    (dispatch, response) => {
      dispatch(receiveSchedule(response));
    }
  );
}

export function removeActivity(scheduleId, activityId) {
  return commonThunk(
    {
      method: 'post',
      path: `/api/v1/schedules/${scheduleId}/remove-activity`,
      body: {
        // eslint-disable-next-line camelcase
        activity_id: activityId,
      },
    },
    (dispatch, response) => {
      dispatch(receiveSchedule(response));
    }
  );
}

export function receiveSchedulingData({ schedule, runs, runners, games, categories, event }) {
  return {
    type: 'admin/RECEIVE_SCHEDULING_DATA',
    data: {
      schedule,
      runs,
      runners,
      games,
      categories,
      event,
    },
  };
}

export function receiveSchedule({ schedule }) {
  return {
    type: 'admin/RECEIVE_SCHEDULE',
    data: {
      schedule,
    },
  };
}
