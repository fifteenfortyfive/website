import { commonThunk, denulled } from '../actions';

export function fetchStreams() {
  return commonThunk({
    method: 'get',
    path: '/api/v1/streams',
    name: 'streams',
  }, (dispatch, response) => {
    dispatch(receiveStreams(response.streams))
  });
}

export function fetchStream(accountId) {
  return commonThunk({
    method: 'get',
    path: `/api/v1/streams/${accountId}`,
    name: `streams.${accountId}`,
  }, (dispatch, response) => {
    dispatch(receiveStreams({[accountId]: response.stream}))
  });
}



export function receiveStreams(streams) {
  return {
    type: 'RECEIVE_STREAMS',
    data: {
      streams
    }
  };
}
