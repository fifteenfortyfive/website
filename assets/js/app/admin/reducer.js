import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import accounts from './modules/accounts/reducer';

const combinedReducer = combineReducers({
  accounts,
});

export default combinedReducer;
