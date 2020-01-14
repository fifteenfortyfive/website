import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import _ from 'lodash';

const getSchedulingState = state => state.admin.scheduling;
const getProp = propName => (_state, props) => props[propName];

export const getSchedule = createSelector([getSchedulingState], state => state.schedule);
export const getActivities = createSelector([getSchedule], schedule =>
  schedule != null ? schedule.activities : []
);
export const getActivity = createSelector([getActivities, getProp('activityId')], (activities, activityId) =>
  _.find(activities, { id: activityId })
);

export const getRuns = createSelector([getSchedulingState], state => Object.values(state.runs));
export const getRunsById = createSelector([getSchedulingState], state => state.runs);
export const getRun = createCachedSelector(
  [getSchedulingState, getProp('runId')],
  (state, runId) => state.runs[runId]
)(getProp('runId'));
export const getAvailableRuns = createSelector([getRuns, getActivities], (runs, activities) => {
  const scheduledRunIds = activities.map(activity => activity.run_id);
  return runs.filter(run => !scheduledRunIds.includes(run.id));
});

export const getRunners = createSelector([getSchedulingState], state => Object.values(state.runners));
export const getRunner = createCachedSelector(
  [getSchedulingState, getProp('runnerId')],
  (state, runnerId) => state.runners[runnerId]
)(getProp('runnerId'));

export const getGames = createSelector([getSchedulingState], state => Object.values(state.games));
export const getGame = createCachedSelector(
  [getSchedulingState, getProp('gameId')],
  (state, gameId) => state.games[gameId]
)(getProp('gameId'));

export const getCategories = createSelector([getSchedulingState], state => Object.values(state.categories));
export const getCategory = createCachedSelector(
  [getSchedulingState, getProp('categoryId')],
  (state, categoryId) => state.categories[categoryId]
)(getProp('categoryId'));

export const getEvent = createSelector([getSchedulingState], state => state.event);

export const getActivitiesWithOffsets = createSelector([getActivities, getRunsById], (activities, runs) => {
  let nextOffset = 0;
  return activities.map(activity => {
    const run = runs[activity.run_id];
    const runSeconds = run != null && run.est_seconds ? run.est_seconds : 0;
    const currentOffset = nextOffset;

    nextOffset += activity.setup_seconds + runSeconds + activity.teardown_seconds;
    return {
      activity,
      offset: currentOffset,
    };
  });
});
