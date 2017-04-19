import * as actionTypes from '../actions/types';

const initialState = {
	path: '/repositories'
};

export default function navigation(state = initialState, action) {
	switch (action.type) {
		case actionTypes.navigate:
			return {
				...state,
				path: action.payload
			};
		default:
			return state;
	}
}