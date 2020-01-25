import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

const getSchedulesState = state => state.admin.schedules;
const getProp = propName => (_state, props) => props[propName];

export const getSchedules = createSelector([getSchedulesState], schedules => Object.values(schedules));

export const getSchedule = createCachedSelector(
  [getSchedulesState, getProp('scheduleId')],
  (schedules, scheduleId) => schedules[scheduleId]
)(getProp('scheduleId'));

export const getEventSchedules = createCachedSelector(
  [getSchedules, getProp('eventId')],
  (schedules, eventId) => schedules.filter(schedule => `${schedule.event_id}` === eventId)
)(getProp('eventId'));
