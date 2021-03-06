import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import admin from './admin/AdminReducer';
import accounts from './modules/accounts/AccountsReducer';
import auth from './modules/auth/AuthReducer';
import events from './modules/events/EventsReducer';
import games from './modules/games/GamesReducer';
import me from './modules/me/MeReducer';
import streams from './modules/streams/StreamsReducer';
import submissions from './modules/submissions/SubmissionsReducer';
import dashboard from './modules/run-dashboard/RunDashboardReducer';
import runs from './modules/runs/RunsReducer';
import teams from './modules/teams/TeamsReducer';

const combinedReducer = combineReducers({
  accounts,
  admin,
  auth,
  dashboard,
  events,
  games,
  me,
  runs,
  streams,
  submissions,
  teams,
});

export const store = createStore(combinedReducer, applyMiddleware(thunk));
