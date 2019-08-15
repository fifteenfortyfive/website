import _ from 'lodash';

const defaultState = {
  allowedRuns: {
    games: {},
    categories: {}
  }
};

const actions = {
  'SUBMISSIONS_RECEIVE_ALLOWED_RUNS': (state, {data}) => {
    const {games, categories} = data;
    const gamesById = _.reduce(games, (acc, game) => {
      acc[game.id] = game;
      return acc;
    }, {});
    const categoriesById = _.reduce(categories, (acc, category) => {
      acc[category.id] = category;
      return acc;
    }, {});

    return {
      ...state,
      allowedRuns: {
        games: gamesById,
        categories: categoriesById,
      }
    };
  },
};



export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
