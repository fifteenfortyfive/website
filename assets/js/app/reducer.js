import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import _ from 'lodash';

const defaultState = {
  me: {
    account: null,
    preferences: null
  },
  accounts: {},
  streams: {},
  events: {},
  games: {},
  teams: {},
  runs: {},
  fetching: {},
};

const reducerActions = {
  'FETCH_STARTED': (state, {data}) => {
    return {
      ...state,
      fetching: {
        ...state.fetching,
        [data.fetchId]: true
      }
    };
  },

  'FETCH_SUCCEEDED': (state, {data}) => {
    return {
      ...state,
      fetching: {
        ...state.fetching,
        [data.fetchId]: false
      }
    };
  },

  'FETCH_FAILED': (state, {data}) => {
    return {
      ...state,
      fetching: {
        ...state.fetching,
        [data.fetchId]: 'failed'
      }
    };
  },

  'RECEIVE_ACCOUNTS': (state, {data}) => {
    const {accounts} = data;
    const accountsById = _.reduce(accounts, (acc, account) => {
      acc[account.id] = account;
      return acc;
    }, {});

    return {
      ...state,
      accounts: {
        ...state.accounts,
        ...accountsById
      }
    }
  },

  'RECEIVE_STREAMS': (state, {data}) => {
    const {streams} = data;

    return {
      ...state,
      streams: {
        ...state.streams,
        ...streams
      }
    }
  },

  'RECEIVE_EVENTS': (state, {data}) => {
    const {events} = data;
    const eventsById = _.reduce(events, (acc, event) => {
      acc[event.id] = event;
      return acc;
    }, {});

    return {
      ...state,
      events: {
        ...state.events,
        ...eventsById
      }
    }
  },

  'RECEIVE_GAMES': (state, {data}) => {
    const {games} = data;
    const gamesById = _.reduce(games, (acc, game) => {
      acc[game.id] = game;
      return acc;
    }, {});

    return {
      ...state,
      games: {
        ...state.games,
        ...gamesById
      }
    }
  },

  'RECEIVE_TEAMS': (state, {data}) => {
    const {teams} = data;
    const teamsById = _.reduce(teams, (acc, team) => {
      acc[team.id] = team;
      return acc;
    }, {});

    return {
      ...state,
      teams: {
        ...state.teams,
        ...teamsById
      }
    }
  },

  'RECEIVE_RUNS': (state, {data}) => {
    const {runs} = data;
    const runsById = _.reduce(runs, (acc, run) => {
      acc[run.id] = run;
      return acc;
    }, {});

    return {
      ...state,
      runs: {
        ...state.runs,
        ...runsById
      }
    }
  },

  'RECEIVE_ACCOUNT_PREFERENCES': (state, {data}) => {
    const {preferences, descriptions} = data;

    return {
      ...state,
      me: {
        ...state.me,
        preferences,
        preferenceDescriptions: descriptions
      }
    };
  },

  'SET_ACCOUNT_PREFERENCE': (state, {data}) => {
    const {preference, value} = data;

    return {
      ...state,
      me: {
        ...state.me,
        preferences: {
          ...state.me.preferences,
          [preference]: value
        }
      }
    };
  },

  'RECEIVE_ME': (state, {data}) => {
    const {account} = data;

    return {
      ...state,
      me: {
        ...state.me,
        account
      }
    }
  },

  'SET_ACCOUNT_DETAIL': (state, {data}) => {
    const {name, value} = data;

    return {
      ...state,
      me: {
        ...state.me,
        account: {
          ...state.me.account,
          [name]: value
        }
      }
    };
  }
}

export function reducer(state = defaultState, action) {
  const func = reducerActions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}

export const store = createStore(reducer, applyMiddleware(thunk));
