import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

const getEventsState = state => state.admin.events;
const getProp = propName => (_state, props) => props[propName];

export const getEvents = createSelector([getEventsState], events => Object.values(events));

export const getEvent = createCachedSelector(
  [getEventsState, getProp('eventId')],
  (events, eventId) => events[eventId]
)(getProp('eventId'));
