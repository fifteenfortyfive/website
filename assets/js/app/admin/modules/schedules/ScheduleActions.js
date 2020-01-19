import { commonThunk, denulled } from '../../../Actions';

export function fetchSchedules({ eventId }) {
  return commonThunk(
    {
      method: 'get',
      path: '/api/v1/schedules',
      query: denulled({
        /* eslint-disable camelcase */
        event_id: eventId,
        /* eslint-enable camelcase */
      }),
    },
    (dispatch, response) => {
      dispatch(receiveSchedules(response.schedules));
    }
  );
}

export function fetchEvent(scheduleId) {
  return commonThunk(
    {
      method: 'get',
      path: `/api/v1/schedules/${scheduleId}`,
    },
    (dispatch, response) => {
      dispatch(receiveSchedules([response.schedule]));
    }
  );
}

export function receiveSchedules(schedules) {
  return {
    type: 'admin/RECEIVE_SCHEDULES',
    data: {
      schedules,
    },
  };
}
