import * as AppActions from '../actions/actions';
// import * as UserStates from '../models/listed';

function redApp(state = {}, action){
	switch(action.type){
		case AppActions.UPDATED_DB:
			return Object.assign({},state,{isUpdatingDB:true});
		
		case AppActions.UPDATED_DB_END:
			return Object.assign({},state,{isUpdatingDB:false});

		default:
			return state;
	}
}

export default redApp;