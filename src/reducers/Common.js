import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_PATH,
  TRIGGER_SNACK,
} from "../constants/ActionTypes";

const INIT_STATE = {
  loading: false,
  status: false,
  message: "",
  error: "",
  path: "/",
  showSnack: false,
  snackMessage: "",
  snackDuration: 600,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...state,
        loading: true,
        error: "",
        message: "",
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        status: true,
        loading: false,
        message: action.payload || "",
        error: "",
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        status: false,
        loading: false,
        message: "",
        error: action.payload || "",
      };
    }

    case TRIGGER_SNACK: {
      return {
        ...state,
        showSnack: action.payload.showSnack,
        snackMessage: action.payload.snackMessage,
        snackDuration: action.payload.snackDuration || 900,
      };
    }
    case GET_PATH: {
      return {
        ...state,
        path: action.payload,
      };
    }
    default:
      return state;
  }
};
