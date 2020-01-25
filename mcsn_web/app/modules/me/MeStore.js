import { createSelector } from 'reselect';

export const getMeState = state => state.me;

export const getAccount = createSelector([getMeState], meState => meState.account);

export const getPreferences = createSelector([getMeState], meState => meState.preferences);
