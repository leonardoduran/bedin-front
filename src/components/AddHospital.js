var React = require('react');
import { browserHistory } from 'react-router';
import store from '../store';
import UserStates from '../models/listed';
import './styles/AddHospital.css';
import Loading from '../components/loading';

module.exports = React.createClass ({
	
	validarCampos: function(){
		
		let hospital=this.refs.hospital.value;
		if(hospital===''){
			alert('Hospital no ingresado')
			this.refs.hospital.focus();
			return false;
		}
		return true;
	},

	fcConfirm: function(){
		if(!this.validarCampos()) return;

		let hospitalName=this.refs.hospital.value;

		let hospital= {
			name:hospitalName
		}
		this.props.addingHospital(hospital); // action
		this.refs.hospital.value=''
	},

	fcCancel:function(){
		browserHistory.push('/');
	},

	render: function(){	
		let botones;
		let userState = store.getState().user.userState;
		if (store.getState().reducerApp.isUpdatingDB){
			botones=<div>
						<Loading />
					</div>
		}else{
			botones=<div>
						<button type="button" className="btn btn-primary login-button" onClick={this.fcConfirm}>Confirmar</button>
						<button type="button" className="btn btn-primary login-button" onClick={this.fcCancel}>Cancelar</button>
					</div>
		}
		if (userState === UserStates.LOGGED){
			return(
			<div>
				<br />
				<form className="form-inline">
				  	<div className="form-group">
				    	<label className="margin-right-5">Institucion</label>
				    	<div className="input-group">
					   		<span className="input-group-addon"></span>
					   		<input ref="hospital" type="text" required className="form-control" placeholder="Nombre institucion"/>
						</div>
				    </div>
				</form>
				<br />
				<br />
			 	<div className="form-group login-register">
			 		{botones}
				</div>
	
			</div>
			)
		}
		else{
			return(<div>
			<h1>Usuario no logueado</h1>
			</div>
			)
		}
	}
})
					// <button type="button" className="btn btn-primary login-button" onClick={this.fcConfirm}>Confirmar</button>
					// <button type="button" className="btn btn-primary login-button" onClick={this.fcCancel}>Cancelar</button>