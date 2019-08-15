import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';

const getSubmissionsState = (state) => state.submissions;
const getAllowedRuns = (state) => state.submissions.allowedRuns;
const getGameId = (_, gameId) => gameId;

export const getAllowedGames = createSelector(
  [getAllowedRuns],
  (runs) => Object.values(runs.games)
);

export const getAllowedGame = createCachedSelector(
  [getAllowedRuns, getGameId],
  (runs, gameId) => runs.games[gameId]
)(getGameId);

export const getAllowedCategories = createSelector(
  [getAllowedRuns],
  (runs) => Object.values(runs.categories)
);

export const getAllowedCategoriesForGame = createSelector(
  [getAllowedCategories, getGameId],
  (categories, gameId) => categories.filter((category) => category.game_id == gameId)
);
