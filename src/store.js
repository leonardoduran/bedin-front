// import {persistStore, autoRehydrate} from 'redux-persist';
import {createStore, compose,applyMiddleware} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import { browserHistory} from 'react-router';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/index';

import {loadState} from './localStorage';

let persistedState=loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, persistedState, composeEnhancers(
    applyMiddleware(thunkMiddleware 
    )));

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
