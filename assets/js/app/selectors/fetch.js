import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

export const getFetchState = state => state.fetching;
export const getFetchGroupName = (state, props) => props.fetchGroup;

export const getFetchGroup = createCachedSelector(
  [getFetchState, getFetchGroupName],
  (fetching, groupName) => fetching.groups[groupName],
)(getFetchGroupName);

export const isFetching = createCachedSelector([getFetchGroup], group => group > 0)(getFetchGroupName);
