import _ from 'lodash';

const defaultState = {};

const actions = {
  RECEIVE_TEAMS: (state, { data }) => {
    const { teams } = data;
    const teamsById = _.reduce(
      teams,
      (acc, team) => {
        acc[team.id] = team;
        return acc;
      },
      {}
    );

    return {
      ...state,
      ...teamsById,
    };
  },
};

export default function reducer(state = defaultState, action) {
  const func = actions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}
