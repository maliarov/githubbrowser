import {
  reposSet,
  reposFetch,
  reposFetchSuccess,
  reposFetchError,
} from '../actions/types';

const initialState = {
  filters: {
    query: '',
  },
  isFetching: false,
  fetchError: null,
  items: null,
  itemsMap: null,
};

function set(state, action) {
  return {
    ...state,
    ...action.payload.items,
  };
}

function fetch(state, action) {
  return {
    ...state,
    filters: {
      query: action.payload,
    },
    isFetching: true,
    fetchError: null,
    items: null,
    itemsMap: null,
  };
}

function fetchSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    ...action.payload,
  };
}

function fetchError(state, action) {
  return {
    ...state,
    isFetching: false,
    fetchError: action.payload,
  };
}


export default function repositories(state = initialState, action) {
  switch (action.type) {
    case reposSet:
      return set(state, action);
    case reposFetch:
      return fetch(state, action);
    case reposFetchSuccess:
      return fetchSuccess(state, action);
    case reposFetchError:
      return fetchError(state, action);
    default:
      return state;
  }
}
