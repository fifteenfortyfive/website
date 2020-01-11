import { combineReducers } from 'redux';

import accounts from './modules/accounts/AccountsReducer';
import scheduling from './modules/scheduling/SchedulingReducer';

const combinedReducer = combineReducers({
  accounts,
  scheduling,
});

export default combinedReducer;
