import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';
import _ from 'lodash';


export const getEventsState = (state) => state.events;
export const getEventId = (_, props) => props.eventId;
export const getEvent = (state, props) => state.events[props.eventId];

export const getEvents = createSelector(
  [getEventsState],
  (eventsState) => Object.values(eventsState)
);

export const getSortedEvents = createSelector(
  [getEvents],
  (events) => _.orderBy(events, ['start_time'], ['desc'])
);
