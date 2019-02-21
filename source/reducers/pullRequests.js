import {
  reposSet,
  reposFetch,
  reposFetchSuccess,
  reposFetchError,
} from '../actions/types';

const initialState = {
  isFetching: false,
  fetchError: null,
  items: null,
  itemsMap: null,
};

function prsSet(state, action) {
  return {
    ...state,
    ...action.payload.items,
  };
}

function prsFetch(state) {
  return {
    ...state,
    isFetching: true,
    fetchError: null,
    items: null,
    itemsMap: null,
  };
}

function prsFetchSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    ...action.payload,
  };
}

function prsFetchError(state, action) {
  return {
    ...state,
    isFetching: false,
    fetchError: action.payload,
  };
}

export default function pullRequests(state = initialState, action) {
  switch (action.type) {
    case reposSet:
      return prsSet(state, action);
    case reposFetch:
      return prsFetch(state, action);
    case reposFetchSuccess:
      return prsFetchSuccess(state, action);
    case reposFetchError:
      return prsFetchError(state, action);
    default:
      return state;
  }
}
