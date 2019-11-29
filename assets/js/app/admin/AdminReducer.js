import { combineReducers } from 'redux';

import accounts from './modules/accounts/AccountsReducer';

const combinedReducer = combineReducers({
  accounts,
});

export default combinedReducer;
