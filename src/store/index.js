import { applyMiddleware, compose, createStore } from 'redux';
import reducers from '../reducers/index';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
let middlewares = [thunk, routeMiddleware, createLogger()];
if (process.env.NODE_ENV === 'production') {
    middlewares = [thunk, routeMiddleware];
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
    const store = createStore(reducers(history), initialState,
        composeEnhancers(applyMiddleware(...middlewares)));
    return store;
}
