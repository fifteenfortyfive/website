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
    dispatch(receiveTeams(response.teams));
  });
}

export function fetchTeam(teamId) {
  return commonThunk({
    method: 'get',
    path: `/api/v1/teams/${teamId}`,
    name: `teams.${teamId}`,
  }, (dispatch, response) => {
    dispatch(receiveTeams([response.team]));
  });
}



export function receiveTeams(teams) {
  return {
    type: 'RECEIVE_TEAMS',
    data: {
      teams
    }
  };
}
