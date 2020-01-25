import _ from 'lodash';

const defaultState = {};

const actions = {
  RECEIVE_GAMES: (state, { data }) => {
    const { games } = data;
    const gamesById = _.reduce(
      games,
      (acc, game) => {
        acc[game.id] = game;
        return acc;
      },
      {}
    );

    return {
      ...state,
      ...gamesById,
    };
  },
};

export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
