import { createSelector } from 'reselect';
import _ from 'lodash';

export const getRunsState = state => state.runs;
export const getRunId = (_, props) => props.runId;
export const getRun = (state, props) => state.runs[props.runId];

export const getRuns = createSelector([getRunsState], runsState => Object.values(runsState));

export const getSortedRuns = createSelector([getRuns], runs => _.sortBy(runs, 'id'));
