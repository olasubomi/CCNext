import { INIT_URL, SIGNOUT_USER_SUCCESS, USER_DATA, USER_TOKEN_SET, USER_ROLE, CUSTOMER_ID, IS_AUTHENTICATED, OPEN_LOGIN } from "../constants/ActionTypes";



    const INIT_STATE = {
        token: '',
        initURL: '',
        authUser: null,
        isAuthenticated: false,
        openLogin: false
    };


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
                token: '',
                authUser: null,
                initURL: '',
                isAuthenticated: false
            }
        }
        case OPEN_LOGIN: {
            return {
                ...state,
                openLogin: action.payload,
            };
        }
        case USER_DATA: {
            return {
                ...state,
                authUser: action.payload,
            };
        }
        case IS_AUTHENTICATED: {
            return {
                ...state,
                isAuthenticated: action.payload,
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