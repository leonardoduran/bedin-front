import {createStore, compose,applyMiddleware} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import { browserHistory} from 'react-router';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/index';

// import user from './data/user';

// Crea objetos con datos default
const defaultState = {
	// user
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, defaultState, composeEnhancers(
    applyMiddleware(thunkMiddleware // lets us dispatch() functions
    )));

export const history = syncHistoryWithStore(browserHistory, store);

export default store;