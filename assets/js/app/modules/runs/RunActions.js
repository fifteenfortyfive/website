import { commonThunk, denulled } from '../../Actions';
import _ from 'lodash';

export function fetchRuns(queryParams) {
  return commonThunk({
    method: 'get',
    path: `/api/v1/runs`,
    name: 'runs',
    query: denulled({
      event_id: queryParams.eventId,
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
