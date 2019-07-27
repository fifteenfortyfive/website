import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';


export const getEventsState = (state) => state.events;
export const getEventId = (_, props) => props.eventId;
export const getEvent = (state, props) => state.events[props.eventId];

export const getEvents = createSelector(
  [getEventsState],
  (eventsState) => Object.values(eventsState)
);

export const getSortedEvents = createSelector(
  [getEvents],
  (events) => _.sortBy(events, 'id')
);
