var React = require('react');
import { browserHistory } from 'react-router';
import store from '../store';
import UserStates from '../models/listed';

module.exports = React.createClass ({
	
	validarCampos: function(){
		
		let plan=this.refs.plan.value;
		if(plan===''){
			alert('Hospital no ingresado')
			this.refs.plan.focus();
			return false;
		}
		return true;
	},

	fcConfirm: function(){
		if(!this.validarCampos()) return;

		let planName=this.refs.plan.value;

		let plan= {
			name:planName
		}
		this.props.addingPlan(plan); // action
		this.refs.plan.value=''
	},

	fcCancel:function(){
		browserHistory.push('/');
	},

	render: function(){	

		let userState = store.getState().user.userState;
		if (userState === UserStates.LOGGED){
			return(
			<div>
				<br />
				<form className="form-inline">
				  	<div className="form-group">
				    	<label className="margin-right-5">Identificador plan</label>
				    	<div className="input-group">
					   		<span className="input-group-addon"></span>
					   		<input ref="plan" type="text" required className="form-control" placeholder="Ingrese el nombre del plan"/>
						</div>
				    </div>
				</form>
				<br />
				<br />
			 	<div className="form-group login-register">
					<button type="button" className="btn btn-primary login-button" onClick={this.fcConfirm}>Confirmar</button>
					<button type="button" className="btn btn-primary login-button" onClick={this.fcCancel}>Cancelar</button>
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