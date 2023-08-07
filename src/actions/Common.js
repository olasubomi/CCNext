import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_PATH,
  TRIGGER_SNACK
} from "../constants/ActionTypes";

export const fetchStart = () => {
  return {
    type: FETCH_START,
  };
};

export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS,
  };
};

export const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    payload: error,
  };
};

export const getPath = (path) => {
  return function (dispatch) {
    dispatch({ type: GET_PATH, payload: path });
  };
};

export const triggerAlert = (payload) => {
  return function (dispatch) {
    dispatch({ type: TRIGGER_SNACK, payload });
  };
};
