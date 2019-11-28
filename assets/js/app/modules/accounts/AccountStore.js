import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

export const getAccountsState = state => state.accounts;
export const getAccountId = (_, props) => props.accountId;
export const getAccount = (state, props) => state.accounts[props.accountId];

export const getAccounts = createSelector([getAccountsState], accountsState => Object.values(accountsState));

export const getSortedAccounts = createSelector([getAccounts], accounts => _.sortBy(accounts, 'id'));
