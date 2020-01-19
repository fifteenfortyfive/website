import { combineReducers } from 'redux';

import accounts from './modules/accounts/AccountsReducer';
import events from './modules/events/EventsReducer';
import schedules from './modules/schedules/SchedulesReducer';
import scheduling from './modules/scheduling/SchedulingReducer';

const combinedReducer = combineReducers({
  accounts,
  events,
  schedules,
  scheduling,
});

export default combinedReducer;
