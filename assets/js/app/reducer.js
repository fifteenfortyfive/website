import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import accounts from './modules/accounts/AccountsReducer';
import admin from './admin/reducer';
import auth from './reducers/auth';
import dashboard from './reducers/dashboard';
import events from './reducers/events';
import fetching from './reducers/fetching';
import games from './reducers/games';
import me from './reducers/me';
import runs from './reducers/runs';
import streams from './reducers/streams';
import submissions from './modules/submissions/reducer';
import teams from './reducers/teams';

const combinedReducer = combineReducers({
  accounts,
  admin,
  auth,
  dashboard,
  events,
  fetching,
  games,
  me,
  runs,
  streams,
  submissions,
  teams
});

export const store = createStore(combinedReducer, applyMiddleware(thunk));
