import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import _ from 'lodash';

import { getTeams } from '../teams/TeamStore';

export const getEventsState = state => state.events;
export const getEventId = (_, props) => props.eventId;
export const getEvent = (state, props) => state.events[props.eventId];

export const getEvents = createSelector([getEventsState], eventsState => Object.values(eventsState));

export const getEventIds = createSelector([getEventsState], eventsState => Object.keys(eventsState));

export const getSortedEvents = createSelector([getEvents], events =>
  _.orderBy(events, ['start_time'], ['desc'])
);

export const getEventTeams = createCachedSelector([getEventId, getTeams], (eventId, teams) =>
  _.filter(teams, t => t.event_id == eventId)
)(getEventId);
