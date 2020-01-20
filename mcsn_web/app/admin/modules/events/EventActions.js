import { commonThunk } from '../../../Actions';

export function fetchEvents() {
  return commonThunk(
    {
      method: 'get',
      path: '/api/v1/admin/events',
    },
    (dispatch, response) => {
      dispatch(receiveEvents(response.events));
    }
  );
}

export function fetchEvent(eventId) {
  return commonThunk(
    {
      method: 'get',
      path: `/api/v1/admin/events/${eventId}`,
    },
    (dispatch, response) => {
      dispatch(receiveEvents([response.event]));
    }
  );
}

export function receiveEvents(events) {
  return {
    type: 'admin/RECEIVE_EVENTS',
    data: {
      events,
    },
  };
}
