import { combineReducers } from 'redux';

import accounts from './modules/accounts/AccountsReducer';
import events from './modules/events/EventsReducer';
import scheduling from './modules/scheduling/SchedulingReducer';

const combinedReducer = combineReducers({
  accounts,
  events,
  scheduling,
});

export default combinedReducer;
