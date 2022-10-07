import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from '../constants/ActionTypes'

const INIT_STATE = {
    loading: false,
    status: false,
    message: '',
    error: "",
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_START: {
            return {
                ...state,
                loading: true,
                error: '',
                message: '',
            };
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                status: true,
                loading: false,
                message: action.payload || '',
                error: '',
            };
        }
        case FETCH_ERROR: {
            return {
                ...state,
                status: false,
                loading: false,
                message: '',
                error: action.payload || ''
            };
        }
        default:
            return state;
    }
}
