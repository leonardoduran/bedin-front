import Main from './Main';
import './styles/App.css';
import * as actionCreators from '../actions/actionsCreator';
import * as actionPatient from '../actions/actionPatient';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

function mapStateToProps(state){
	return {
		user: state.user,
		rooms: state.rooms,
		patient: state.patient,
		reducerApp: state.reducerApp
	}
}

function mapDispachToProps(dispatch){
	return bindActionCreators(
		Object.assign({},actionCreators,actionPatient), 
		dispatch)
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;