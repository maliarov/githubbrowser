import * as actionTypes from './types';

export function navigate(path) {
	return {
		type: actionTypes.navigate,
		payload: path
	};
}