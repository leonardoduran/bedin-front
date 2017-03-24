import * as AppActions from '../actions/actions';
// import * as RoomStates from '../models/listed';

function rooms(state = {}, action){
	switch(action.type){
		case AppActions.UNOFFER_BEDS:
			return Object.assign({},state,{
				disponibles: state.disponibles ? parseInt(state.disponibles,10)+parseInt(action.qty,10) : parseInt(action.qty,10), 
				bloqueadas:  state.bloqueadas-action.qty>0 ? state.bloqueadas-action.qty : 0
			});

		case AppActions.OFFER_BEDS:
			return Object.assign({},state,{
				disponibles: state.disponibles-action.qty>0 ? state.disponibles-action.qty : 0, 
				bloqueadas:  state.bloqueadas ? parseInt(state.bloqueadas,10)+parseInt(action.qty,10) : parseInt(action.qty,10)
			});

		case AppActions.LOAD_ROOMS:
			return Object.assign({},state,{
				beds_room:action.data
			});
			
		default:
			return state;
	}
}

export default rooms;