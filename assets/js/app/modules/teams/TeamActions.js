import { commonThunk, denulled } from '../../actions';

export function fetchTeams(queryParams = {}) {
  return commonThunk({
    method: 'get',
    path: `/api/v1/teams`,
    name: 'teams',
    query: denulled({
      event_id: queryParams.eventId,
      team_ids: queryParams.teamIds
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
