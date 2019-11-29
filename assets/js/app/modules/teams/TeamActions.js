import { commonThunk, denulled } from '../../Actions';

export function fetchTeams(queryParams = {}) {
  return commonThunk(
    {
      method: 'get',
      path: `/api/v1/teams`,
      name: 'teams',
      query: denulled({
        /* eslint-disable camelcase */
        event_id: queryParams.eventId,
        team_ids: queryParams.teamIds,
        /* eslint-enable camelcase */
      }),
    },
    (dispatch, response) => {
      dispatch(receiveTeams(response.teams));
    }
  );
}

export function fetchTeam(teamId) {
  return commonThunk(
    {
      method: 'get',
      path: `/api/v1/teams/${teamId}`,
      name: `teams.${teamId}`,
    },
    (dispatch, response) => {
      dispatch(receiveTeams([response.team]));
    }
  );
}

export function receiveTeams(teams) {
  return {
    type: 'RECEIVE_TEAMS',
    data: {
      teams,
    },
  };
}
