import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

const getSubmissionsState = state => state.submissions;
const getAllowedRuns = state => state.submissions.allowedRuns;
const getGameId = (_, gameId) => gameId;
const getCategoryId = (_, categoryId) => categoryId;

export const getRunnerSubmission = state => state.submissions.runner;

const getRuns = state => state.submissions.runs;
export const getRunSubmissions = createSelector([getRuns], runs => Object.values(runs));

export const getAllowedGames = createSelector([getAllowedRuns], runs => Object.values(runs.games));

export const getAllowedGame = createCachedSelector(
  [getAllowedRuns, getGameId],
  (runs, gameId) => runs.games[gameId]
)(getGameId);

export const getAllowedCategories = createSelector([getAllowedRuns], runs => Object.values(runs.categories));

export const getAllowedCategory = createCachedSelector(
  [getAllowedRuns, getCategoryId],
  (runs, categoryId) => runs.categories[categoryId]
)(getCategoryId);

export const getAllowedCategoriesForGame = createSelector(
  [getAllowedCategories, getGameId],
  (categories, gameId) => categories.filter(category => category.game_id == gameId)
);
