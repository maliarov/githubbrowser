import { ListView } from 'react-native';

import * as actionTypes from './types';
import GitHub from '../models/GitHub';

export function set(repositories) {
  return {
    type: actionTypes.reposSet,
    payload: {
      items: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        .cloneWithRows(repositories),
      itemsMap: repositories.reduce((map, repository) => (
        { ...map, [repository.id]: repository }
      ), {}),
    },
  };
}

export function fetchSuccess(repositories) {
  return {
    type: actionTypes.reposFetchSuccess,
    payload: {
      items: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        .cloneWithRows(repositories),
      itemsMap: repositories.reduce((map, repository) => (
        { ...map, [repository.id]: repository }
      ), {}),
    },
  };
}

export function fetchError(error) {
  return {
    type: actionTypes.reposFetchError,
    payload: error,
  };
}

export function fetch(query) {
  return (dispatch) => {
    dispatch({ type: actionTypes.reposFetch, payload: query });

    GitHub.search.repositories({ q: query || 'stars:>0', s: 'stars', o: 'desc' })
      .then(({ items }) => dispatch(fetchSuccess(items)))
      .catch(err => dispatch(fetchError(err)));
  };
}
