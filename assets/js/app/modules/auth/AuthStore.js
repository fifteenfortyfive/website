export const getAuthState = state => state.auth;
export const isLoggedIn = state => getAuthState(state).sessionId != null;
