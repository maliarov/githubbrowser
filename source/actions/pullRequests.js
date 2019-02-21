import { ListView } from 'react-native';

import {
  prsSet,
  prsFetchSuccess,
  prsFetchError,
  prsFetch,
} from './types';

import GitHub from '../models/GitHub';

export function set(pullRequests) {
  return {
    type: prsSet,
    payload: {
      items: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        .cloneWithRows(pullRequests),
      itemsMap: pullRequests.reduce((map, repository) => (
        { ...map, [repository.id]: repository }
      ), {}),
    },
  };
}

export function fetchSuccess(pullRequests) {
  return {
    type: prsFetchSuccess,
    payload: {
      items: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        .cloneWithRows(pullRequests),
      itemsMap: pullRequests.reduce((map, repository) => (
        { ...map, [repository.id]: repository }
      ), {}),
    },
  };
}

export function fetchError(error) {
  return {
    type: prsFetchError,
    payload: error,
  };
}

export function fetch({ owner, repo }) {
  return async (dispatch) => {
    dispatch({ type: prsFetch, payload: { owner, repo } });

    try {
      const resp = await GitHub.search.pulls({ owner, repo });
      dispatch(fetchSuccess(resp.items));
    } catch (err) {
      dispatch(fetchError(err));
    }
  };
}
