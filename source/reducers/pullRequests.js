import {
  prsSet,
  prsFetch,
  prsFetchSuccess,
  prsFetchError,
} from '../actions/types';

const initialState = {
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

function fetch(state) {
  return {
    ...state,
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

export default function pullRequests(state = initialState, action) {
  switch (action.type) {
    case prsSet:
      return set(state, action);
    case prsFetch:
      return fetch(state, action);
    case prsFetchSuccess:
      return fetchSuccess(state, action);
    case prsFetchError:
      return fetchError(state, action);
    default:
      return state;
  }
}
