import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import user from  './user';
import rooms from './rooms';
import patient from './patient';
// import reducerApp from './reducerApp';


const rootReducer = combineReducers({user,rooms,patient,  routing: routerReducer})
// ,reducerApp
export default rootReducer;