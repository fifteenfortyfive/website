import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';
import _ from 'lodash';

import {getRuns} from '../modules/runs/RunStore';

import {timeFromISO} from '../util';


export const getTeamsState = (state) => state.teams;
export const getTeamId = (_, props) => props.teamId;
export const getTeam = (state, props) => state.teams[props.teamId];

export const getTeams = createSelector(
  [getTeamsState],
  (teamsState) => Object.values(teamsState)
);

export const getSortedTeams = createSelector(
  [getTeams],
  (teams) => _.sortBy(teams, 'id')
);

export const getTeamRuns = createCachedSelector(
  [getRuns, getTeamId],
  (runs, teamId) => {
    const teamRuns = _.filter(runs, (run) => run.team_id == teamId);
    return _.sortBy(teamRuns, 'index');
  }
)(getTeamId);

export const getCaptainId = createCachedSelector(
  [getTeam],
  (team) => team && team.captain_id
)(getTeamId);

export const getTeamRunIds = createCachedSelector(
  [getTeamRuns],
  (runs) => _.map(runs, 'id')
)(getTeamId);

export const getTeamEstimate = createCachedSelector(
  [getTeamRuns],
  (runs) => _.sumBy(runs, 'est_seconds')
)(getTeamId);

export const getTeamActualGameTime = createCachedSelector(
  [getTeamRuns],
  (runs) => _.sumBy(runs, 'actual_seconds')
)(getTeamId);

export const getTeamActualTime = createCachedSelector(
  [getTeam],
  (team) => team.actual_time_seconds
)(getTeamId);

export const getTeamStartTime = createCachedSelector(
  [getTeam],
  (team) => timeFromISO(team.actual_start_time)
)(getTeamId);

export const getTeamEndTime = createCachedSelector(
  [getTeam],
  (team) => timeFromISO(team.actual_end_time)
)(getTeamId);
