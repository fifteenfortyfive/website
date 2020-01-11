import { commonThunk } from '../../../Actions';

export function fetchEventSchedule(eventId) {
  return commonThunk(
    {
      method: 'get',
      path: `/api/events/${eventId}/schedule`,
    },
    (dispatch, response) => {
      dispatch(receiveEventSchedule(response.schedule));
    }
  );
}

export function fetchEventRuns(eventId) {
  return commonThunk(
    {
      method: 'get',
      path: `/api/events/${eventId}/runs`,
    },
    (dispatch, response) => {
      dispatch(receiveEventScheduleRuns(response.runs));
    }
  );
}

export function receiveEventSchedule(schedule) {
  return {
    type: 'admin/RECEIVE_SCHEDULE',
    data: {
      schedule,
    },
  };
}

export function receiveEventScheduleRuns(runs = []) {
  return {
    type: 'admin/RECEIVE_SCHEDULE_RUNS',
    data: {
      runs,
    },
  };
}
