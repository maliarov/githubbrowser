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
      itemsMap: pullRequests.reduce((map, pullRequest) => (
        { ...map, [pullRequest.id]: pullRequest }
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
      itemsMap: pullRequests.reduce((map, pullRequest) => (
        { ...map, [pullRequest.id]: pullRequest }
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

export function fetch({
  owner, repo, sort = 'created', direction = 'desc',
}) {
  return (dispatch) => {
    dispatch({
      type: prsFetch,
      payload: {
        owner, repo, sort, direction,
      },
    });

    GitHub.search.pulls({
      owner, repo, sort, direction,
    })
      .then(items => dispatch(fetchSuccess(items)))
      .catch(err => dispatch(fetchError(err)));
  };
}
