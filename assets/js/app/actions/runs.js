import { commonThunk, denulled } from '../actions';
import _ from 'lodash';

export function fetchRuns(eventId, queryParams) {
  return commonThunk({
    method: 'get',
    path: `/api/v1/events/${eventId}/runs`,
    name: 'runs',
    query: denulled({
      team_id: queryParams.teamId,
      account_id: queryParams.accountId,
      run_ids: queryParams.runIds,
      embeds: _.join(queryParams.embeds, ',')
    })
  }, (dispatch, response) => {
    dispatch(receiveRuns(response.runs))
  });
}

export function fetchRun(runId) {
  return fetchRuns({runIds: [runId]});
}



export function receiveRuns(runs) {
  return {
    type: 'RECEIVE_RUNS',
    data: {
      runs
    }
  };
}
