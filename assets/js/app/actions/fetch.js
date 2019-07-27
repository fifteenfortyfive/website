import {uniqueId} from 'lodash';

export function makeFetchGroup() {
  return uniqueId('fetch-');
}

export function incrementFetch(group) {
  return {
    type: 'INCREMENT_FETCH_GROUP',
    data: {
      group
    }
  };
};

export function decrementFetch(group) {
  return {
    type: 'DECREMENT_FETCH_GROUP',
    data: {
      group
    }
  };
};
