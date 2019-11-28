import _ from 'lodash';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

export const getDashboardState = state => state.dashboard;

export const getRunIds = createSelector([getDashboardState], dashboard => Object.keys(dashboard.runs));

export const getRuns = createSelector([getDashboardState], dashboard => Object.values(dashboard.runs));

export const getOrderedRuns = createSelector([getRuns], runs => _.sortBy(runs, 'index'));
