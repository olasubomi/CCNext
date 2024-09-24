import { combineReducers } from 'redux';
import userReducer from '../reducers/userSlice'
// import {connectRouter} from 'connected-react-router'
import Auth from './Auth';
import Common from './Common';
import Cart from './Cart';

export default combineReducers({
  Auth,
  Common,
  Cart
});
