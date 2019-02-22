import * as actionTypes from './types';

export function navigate(path) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.navigate,
      payload: path,
    });
  };
}

export default {};
