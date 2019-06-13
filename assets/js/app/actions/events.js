import { commonThunk, denulled } from '../actions';

export function fetchEvents(eventIds) {
  return commonThunk({
    method: 'get',
    path: '/api/v1/events',
    name: 'events',
    query: denulled({
      event_ids: eventIds
    })
  }, (dispatch, response) => {
    dispatch(receiveEvents(response.events));
  });
}

export function fetchEvent(eventId) {
  return fetchEvents([eventId]);
}



export function receiveEvents(events) {
  return {
    type: 'RECEIVE_EVENTS',
    data: {
      events
    }
  };
}
