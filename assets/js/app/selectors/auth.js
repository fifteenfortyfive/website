import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';


export const getAuthState = (state) => state.auth;

export const isLoggedIn = createSelector(
  [getAuthState],
  (authState) => authState.sessionId != null
);
