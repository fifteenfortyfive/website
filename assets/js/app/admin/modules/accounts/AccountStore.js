import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

const getAccountsState = state => state.admin.accounts;
const getAccountId = (_, accountId) => accountId;

export const getAccounts = createSelector([getAccountsState], accounts => Object.values(accounts));

export const getAccount = createCachedSelector(
  [getAccountsState, getAccountId],
  (accounts, accountId) => accounts[accountId],
)(getAccountId);

export const getAccountIds = createSelector([getAccountsState], accounts => Object.keys(accounts));
