import {combineReducers} from 'redux';
import {AuthReducers} from './Auth';
import {CartReducer} from './Cart';
import {CommonReducer} from './Common';


export default combineReducers({
  Auth : AuthReducers,
  Common: CommonReducer,
  Cart : CartReducer,
});
