import { INIT_URL, SIGNOUT_USER_SUCCESS, USER_DATA, USER_TOKEN_SET, USER_ROLE, CUSTOMER_ID } from "../constants/ActionTypes";

if (typeof window !== 'undefined') {

    const INIT_STATE = {
        token: JSON.parse(localStorage.getItem('token')),
        initURL: '',
        authUser: null,
    };
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case INIT_URL:
            return {
                ...state,
                initURL: action.payload
            };
        case SIGNOUT_USER_SUCCESS: {
            return {
                ...state,
                token: null,
                authUser: null,
                initURL: ''
            }
        }
        case USER_DATA: {
            return {
                ...state,
                authUser: action.payload,
            };
        }
        case USER_TOKEN_SET: {
            return {
                ...state,
                token: action.payload,
            };
        }
        case USER_ROLE: {
            return {
                ...state,
                role: action.payload,
            };
        }
        case CUSTOMER_ID: {
            return {
                ...state,
                customer_id: action.payload,
            };
        }
        default:
            return state;
    }
}