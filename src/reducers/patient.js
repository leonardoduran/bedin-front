import * as AppActions from '../actions/actions';




function patient(state = {}, action){
	switch(action.type){
		case AppActions.ADDING_PATIENT_REQUEST:
			return Object.assign({},state,{
				adding:true, 
			});

		case AppActions.PATIENT_REQUEST_END:
			return Object.assign({},state,{
				adding:false, 
			});

		default:
			return state;
	}
}

export default patient;