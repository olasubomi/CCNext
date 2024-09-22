import { combineReducers } from 'redux';
import userReducer from '../reducers/userSlice'
// import {connectRouter} from 'connected-react-router'
import Auth from './Auth';
import Common from './Common';
import userType from "./userSlice"

export default combineReducers({
  Auth,
  Common,
  user: userReducer,
  userType
});
