import {combineReducers} from 'redux';
import {AuthReducers} from './Auth';
import {CartReducer} from './Cart';
import {CommonReducer} from './Common';
// import {connectRouter} from 'connected-react-router'




export default combineReducers({
  Auth : AuthReducers,
  Common: CommonReducer,
  Cart : CartReducer,
});
