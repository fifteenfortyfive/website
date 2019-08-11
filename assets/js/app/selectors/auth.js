import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';


export const getAuthState = (state) => state.auth;
export const isLoggedIn = (state) => getAuthState(state).sessionId != null;
