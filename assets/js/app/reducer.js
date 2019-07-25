import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import accounts from './reducers/accounts';
import dashboard from './reducers/dashboard';
import events from './reducers/events';
import fetching from './reducers/fetching';
import games from './reducers/games';
import me from './reducers/me';
import runs from './reducers/runs';
import streams from './reducers/streams';
import teams from './reducers/teams';

const combinedReducer = combineReducers({
  accounts,
  dashboard,
  events,
  fetching,
  games,
  me,
  runs,
  streams,
  teams
});

export const store = createStore(combinedReducer, applyMiddleware(thunk));
