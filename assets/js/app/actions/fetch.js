import {uniqueId} from 'lodash';

export const makeFetchGroup(customPrefix='') {
  return uniqueId(`fetch-${customPrefix}`);
}

export const incrementFetch(group) {
  return {
    type: 'INCREMENT_FETCH_GROUP',
    data: {
      group
    }
  };
};

export const decrementFetch(group) {
  return {
    type: 'DECREMENT_FETCH_GROUP',
    data: {
      group
    }
  };
};
