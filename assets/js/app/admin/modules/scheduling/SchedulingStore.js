import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import _ from 'lodash';

import * as StringUtils from '../../../utils/StringUtils';
import * as TimeUtils from '../../../utils/TimeUtils';

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
export const getRunnersById = createSelector([getSchedulingState], state => state.runners);
export const getRunner = createCachedSelector(
  [getSchedulingState, getProp('runnerId')],
  (state, runnerId) => state.runners[runnerId]
)(getProp('runnerId'));

export const getGames = createSelector([getSchedulingState], state => Object.values(state.games));
export const getGamesById = createSelector([getSchedulingState], state => state.games);
export const getGame = createCachedSelector(
  [getSchedulingState, getProp('gameId')],
  (state, gameId) => state.games[gameId]
)(getProp('gameId'));

export const getCategories = createSelector([getSchedulingState], state => Object.values(state.categories));
export const getCategoriesById = createSelector([getSchedulingState], state => state.categories);
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
    const setup = activity.setup_seconds != null ? activity.setup_seconds : 0;
    const teardown = activity.teardown_seconds != null ? activity.teardown_seconds : 0;

    nextOffset += setup + runSeconds + teardown;
    return {
      activity,
      offset: currentOffset,
    };
  });
});
export const getTotalEventSeconds = createSelector(
  [getActivitiesWithOffsets, getRunsById],
  (activities, runs) => {
    const { activity: last, offset } = _.last(activities);
    const run = runs[last.run_id];
    const runSeconds = run != null && run.est_seconds ? run.est_seconds : 0;
    const setup = last.setup_seconds != null ? last.setup_seconds : 0;
    const teardown = last.teardown_seconds != null ? last.teardown_seconds : 0;

    return offset + setup + runSeconds + teardown;
  }
);

export const getRunsMatchingQuery = createCachedSelector(
  [getRuns, getGamesById, getCategoriesById, getRunnersById, getProp('query')],
  (runs, games, categories, runners, query) => {
    return runs.filter(run => {
      const game = games[run.game_id] ? games[run.game_id] : '';
      const category = categories[run.category_id];
      const runner = runners[run.account_id];
      const estimate = run.est_seconds ? TimeUtils.runTime(run.est_seconds) : '';
      const haystack = [
        game && game.name,
        category && category.name,
        runner && runner.username,
        estimate,
        runner && runner.twitch,
        runner && runner.twitter,
      ]
        .filter(q => q)
        .join(' ');
      console.log(haystack);
      return StringUtils.fuzzysearch(query.toLowerCase(), haystack.toLowerCase());
    });
  }
)(getProp('query'));
