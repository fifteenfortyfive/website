import { createSelector } from 'reselect';
import _ from 'lodash';

export const getStreamsState = state => state.streams;
export const getStreamId = (_, props) => props.streamId;
export const getStream = (state, props) => state.streams[props.accountId];

export const getStreams = createSelector([getStreamsState], streamsState => Object.values(streamsState));

export const getSortedStreams = createSelector([getStreams], streams => _.sortBy(streams, 'id'));
