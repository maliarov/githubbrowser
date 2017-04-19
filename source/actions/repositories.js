import {ListView} from 'react-native';
import * as actionTypes from './types';
import GitHub from '../models/GitHub';

export function set(repositories) {
	return {
		type: actionTypes.reposSet,
		payload: {
			items: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(repositories),
			itemsMap: repositories.reduce((map, repository) => (map[repository.id] = repository) && map, {})
		}
	};
}

export function fetch(query) {
	return function (dispatch) {
		GitHub.search.repositories({q: query || 'stars:>0', s: 'stars', o: 'desc'})
			.then((response) => dispatch(fetchSuccess(response.items)))
			.catch((error) => dispatch(fetchError(error)));

		dispatch({type: actionTypes.reposFetch, payload: query});
	};
}

export function fetchSuccess(repositories) {
	return {
		type: actionTypes.reposFetchSuccess,
		payload: {
			items: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(repositories),
			itemsMap: repositories.reduce((map, repository) => (map[repository.id] = repository) && map, {})
		}
	};
}

export function fetchError(error) {
	return {
		type: actionTypes.reposFetchError,
		payload: error
	};
}