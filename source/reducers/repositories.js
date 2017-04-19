import * as actionTypes from '../actions/types';

const initialState = {
	filters: {
		query: ''
	},
	isFetching: false,
	fetchError: null,
	items: null,
	itemsMap: null
};

export default function repositories(state = initialState, action) {
	switch (action.type) {
		case actionTypes.reposSet:
			return set(state, action);
		case actionTypes.reposFetch:
			return fetch(state, action);
		case actionTypes.reposFetchSuccess:
			return fetchSuccess(state, action);
		case actionTypes.reposFetchError:
			return fetchError(state, action);
		default:
			return state;
	}
}

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
			query: action.payload
		},
		isFetching: true,
		fetchError: null,
		items: null,
		itemsMap: null
	};
}

function fetchSuccess(state, action) {
	return {
		...state,
		isFetching: false,
		...action.payload
	};
}

function fetchError(state, action) {
	return {
		...state,
		isFetching: false,
		fetchError: action.payload
	};
}