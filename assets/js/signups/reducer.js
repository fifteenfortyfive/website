import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const defaultState = {
  availableGames: [
    "Super Mario 64",
    "Super Mario Sunshine",
    "Super Mario Galaxy",
    "Super Mario Galaxy 2",
    "Banjo-Kazooie",
    "Banjo-Tooie",
    "Donkey Kong 64",
    "Spyro the Dragon",
    "Spyro 2: Ripto's Rage",
    "Spyro: Year of the Dragon",
    "Crash Bandicoot",
    "Crash Bandicoot 2: Cortex Strikes Back",
    "Crash Bandicoot: Warped"
  ],
  id: null,
  // Sorted list of game submissions
  games: [{
    game: "",
    pb: null,
    est: null
  }],
  // List of names the runner would like to pair with
  pairWith: null,
  // List of names the runner would like to avoid
  avoid: null,
  // Maximum number of games the runner is willing to run
  maxGames: null,
  // Maximum amount of time the runner is willing to run
  maxTime: null,
  // Whether the runner is willing to be a team captain
  captain: false,
  // Whether the submission has been revoked
  revoked: false,
  // True once the user has hit the submit button
  submitting: false,
  // Current user information
  user: {
    username: null,
    twitter: null,
    twitch: null,
    discord_username: null,
    discord_discriminator: null
  }
};

const reducerActions = {
  'ADD_GAME': (state, {data}) => {
    const {game} = data;
    const newGameList = [...state.games, game]
    return {
      ...state,
      games: newGameList
    };
  },

  'REMOVE_GAME': (state, {data}) => {
    const {index} = data;
    const newGames = [
      ...state.games.slice(0, index),
      ...state.games.slice(index+1)
    ];
    return {
      ...state,
      games: newGames
    };
  },

  'UPDATE_GAME': (state, {data}) => {
    const {index, field, value} = data;
    const game = state.games[index];
    const newGame = {
      ...game,
      [field]: value
    };
    const newGames = [
      ...state.games.slice(0, index),
      newGame,
      ...state.games.slice(index+1)
    ];
    return {
      ...state,
      games: newGames
    };
  },

  'TOGGLE_CAPTAIN': (state, {data}) => {
    const {yesno} = data;
    return {
      ...state,
      captain: yesno
    };
  },

  'UPDATE_MAX_GAMES': (state, {data}) => {
    const {maxGames} = data;
    return {
      ...state,
      maxGames
    };
  },

  'UPDATE_MAX_TIME': (state, {data}) => {
    const {maxTime} = data;
    return {
      ...state,
      maxTime
    };
  },

  'UPDATE_PAIR_WITH': (state, {data}) => {
    const {pairWith} = data;
    return {
      ...state,
      pairWith
    };
  },

  'UPDATE_AVOID': (state, {data}) => {
    const {avoid} = data;
    return {
      ...state,
      avoid
    };
  },

  'START_SUBMISSION': (state, {data}) => {
    return {
      ...state,
      submitting: true
    };
  },

  'RECEIVE_EXISTING_SUBMISSION': (state, {data}) => {
    return {
      ...state,
      id: data.id,
      games: data.games || [],
      maxGames: data.max_games,
      maxTime: data.max_time,
      pairWith: data.pair_with,
      avoid: data.avoid,
      captain: data.captain,
      submitting: false,
      user: data.user
    }
  }
}

export function reducer(state = defaultState, action) {
  const func = reducerActions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}

export const store = createStore(reducer, applyMiddleware(thunk));
