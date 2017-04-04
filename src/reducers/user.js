import * as AppActions from '../actions/actions';
import * as UserStates from '../models/listed';

function user(state = {}, action){
	switch(action.type){
		case AppActions.LOGIN_USER:
			return Object.assign({},state,{
				userState:UserStates.LOGGED, 
				userId: action.user._id,
				username:action.user.username, 
				hospitalName:action.hospitalName,
				hospitalId:action.user.hospitalCode,
				userRol: action.user.rol
			});

		case AppActions.LOGOUT_USER:
			return Object.assign({},state,{
				userState:UserStates.UNLOGGED, 
				userId: '',
				username:"",
				hospitalName:'',
				hospitalId:'',				
				userRol: "",
				isRegistering:false
			});

		case AppActions.REGISTERING_USER:
			return Object.assign({},state,{isRegistering:true});
		
		case AppActions.REGISTERING_USER_OK:
			return Object.assign({},state,{isRegistering:false});

		case AppActions.IS_LOGIN_USER:
			return Object.assign({},state,{userState:UserStates.IS_LOGGEDIN});

		case AppActions.IS_LOGOUT_USER:
			return Object.assign({},state,{userState:UserStates.IS_UNLOGGEDIN});

		case AppActions.IS_REGISTRING_USER:
			return Object.assign({},state,{userState:UserStates.IS_REGISTRING});

		default:
			return state;
	}
}

export default user;