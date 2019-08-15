import { commonThunk, denulled } from '../../actions';

export function fetchAllowedRuns(eventId) {
  return commonThunk({
    method: 'get',
    path: `/api/v1/events/${eventId}/allowed-runs`
  }, (dispatch, response) => {
    dispatch(receiveAllowedRuns(response.games, response.categories));
  });
}



export function receiveAllowedRuns(games, categories) {
  return {
    type: 'SUBMISSIONS_RECEIVE_ALLOWED_RUNS',
    data: {
      games,
      categories
    }
  };
}
