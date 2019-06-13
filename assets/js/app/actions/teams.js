import { commonThunk, denulled } from '../actions';

export function fetchTeams(eventId, teamIds) {
  return commonThunk({
    method: 'get',
    path: `/api/v1/events/${eventId}/teams`,
    name: 'teams',
    query: denulled({
      team_ids: teamIds
    })
  }, (dispatch, response) => {
    dispatch(receiveTeams(response.teams))
  });
}

export function fetchTeam(teamId) {
  return fetchTeams([teamId]);
}



export function receiveTeams(teams) {
  return {
    type: 'RECEIVE_EVENTS',
    data: {
      teams
    }
  };
}
