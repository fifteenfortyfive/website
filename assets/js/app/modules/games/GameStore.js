import { createSelector } from 'reselect';
import _ from 'lodash';

export const getGamesState = state => state.games;
export const getGameId = (_, props) => props.gameId;
export const getGame = (state, props) => state.games[props.gameId];

export const getGames = createSelector([getGamesState], gamesState => Object.values(gamesState));

export const getSortedGames = createSelector([getGames], games => _.sortBy(games, 'id'));
