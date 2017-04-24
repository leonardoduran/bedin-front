var React = require('react');
import { browserHistory } from 'react-router';
import store from '../store';
import UserStates from '../models/listed';
import * as config from '../config/config';
import './styles/AddHealthCare.css';

module.exports = React.createClass ({
	
	validarCampos: function(){

		let healthCare=this.refs.healthCare.value;
		let email=this.refs.email.value;
		let phone=this.refs.phone.value;

		if(healthCare===''){
			alert('Obra social no ingresada')
			this.refs.healthCare.focus();
			return false;
		}
		if(email===''){
			alert('Mail no ingresado')
			this.refs.email.focus();
			return false;
		}
		if(phone===''){
			alert('Teléfono no ingresado')
			this.refs.phone.focus();
			return false;
		}

		if(this.healthCarePlanSelected.length===0){
			alert('No se seleccionó ningún plan')
			this.refs.plans.focus();
			return false;
		}
		
		if(this.hospitalsSelected.length===0){
			alert('No se seleccionó ningún hospital')
			this.refs.hospital.focus();
			return false;
		}

		return true;
	},

	fcConfirm: function(){

		this.hospitalsSelected=[];
		for(let i=0; i<this.refs.hospital.length; i++){
			if(this.refs.hospital.options[i].selected)
				this.hospitalsSelected.push(this.refs.hospital.options[i].value)
		}

		this.healthCarePlanSelected=[];
		for(let i=0; i<this.refs.plan.length; i++){
			if(this.refs.plan.options[i].selected)
				this.healthCarePlanSelected.push(this.refs.plan.options[i].value)
		}

		if(!this.validarCampos()) return;
		let name=this.refs.healthCare.value;
		let email=this.refs.email.value;
		let phone=this.refs.phone.value;
		let request= {
			name,
			email,
			phone,
			plans:this.healthCarePlanSelected,
			hospitals:this.hospitalsSelected,
		}

		this.props.addingHealthCare(request);
		this.refs.healthCare.value='';
		this.refs.email.value=''
		this.refs.phone.value=''

	},

	fcCancel:function(){
		browserHistory.push('/');
	},
  	
  	getInitialState: function() {
    return {
		healthCarePlan:[],
		hospitals:[],
		healthCarePlanSelected:[],
		hospitalsSelected:[],
		hospitalsSelected2:[]
    	}
  	},	
	
	componentDidMount:function(){

	    var _this = this;

		var getPlans = function() {
		   var promise = new Promise(function(resolve, reject){
			fetch(`${config.API_URL}hospitals/healthCarePlans`, { 
	        method: 'GET',
	        credentials: 'include',
	    	})	
	      	.then(function(response) {
	        	return response.json()
	      	})
	      	.then(function(result) {
	          _this.setState({
	            healthCarePlan: result
	          });
	      })
		   });
		   return promise;
		};

		var getHospitals = function() {
		   var promise = new Promise(function(resolve, reject){
			fetch(`${config.API_URL}hospitals`, { 
	        method: 'GET',
	        credentials: 'include',
	    	})	
	      	.then(function(response) {
	        	return response.json()
	      	})
	      	.then(function(result) {
	          _this.setState({
	            hospitals: result
	          });
	      })
		   });
		   return promise;
		};


		Promise.all([getPlans(), getHospitals()])
		.then(function(resultado){
			console.log("PASO!")
			console.log(resultado); //un arreglo con los valores pasamos a resolve en cada metodo
		})
		.catch( function(err){
			console.log("ERROR!")
			console.warn(err); //mostramos el error por consola. Veremos que es el que falló primero, o sea el del primer metodo
		});   
	},

	render: function(){	
		let optionsHealthCarePlan=[];
		let optionsHospital=[]


    	if(this.state.hospitals.length>0)
	    	for (let i = 0; i < this.state.hospitals.length; i++) {
	            let option = this.state.hospitals[i];        
	        	optionsHospital.push(
	                <option key={i} value={option._id}>{option.name}</option>)
	        };	        

    	if(this.state.healthCarePlan.length>0)
	    	for (let i = 0; i < this.state.healthCarePlan.length; i++) {
	            let option = this.state.healthCarePlan[i];        
	        	optionsHealthCarePlan.push(
	                <option key={i} value={option._id}>{option.name}</option>)
	        };

		let userState = store.getState().user.userState;
		if (userState === UserStates.LOGGED){
			return(
			<div>

				<br />
				<form className="form-inline">
					<div className="form-group">
					  	<label className="margin-right-20">Obra Social</label>
					   	<div className="input-group left-50">
					   		<span className="input-group-addon"></span>
					   		<input ref="healthCare" type="text" required className="form-control" placeholder="Ingrese el nombre de la obra social"/>
						</div>
					</div>
				</form>

				<form className="form-inline">
				  	<div className="form-group">
				    	<label className="margin-right-20">Email</label>
				    	<div className="input-group left-50">
					   		<span className="input-group-addon"></span>
					   		<input ref="email" type="text" required className="form-control" placeholder="Ingrese email"/>
						</div>
				    </div>
				</form>
				<form className="form-inline">
				  	<div className="form-group">
				    	<label className="margin-right-20">Teléfono</label>
				    	<div className="input-group left-50">
					   		<span className="input-group-addon"></span>
					   		<input ref="phone" type="text" required className="form-control" placeholder="Ingrese el teléfono"/>
						</div>
				    </div>
				</form>

				<form className="form-inline">
				  	<div className="form-group">
				    	<label className="margin-right-20">Hospitales</label>
				    	<div className="input-group left-50">
					   		<span className="input-group-addon"></span>
					   		<select ref="hospital" size="5" multiple>{optionsHospital}</select>
						</div>
				    </div>
				</form>
				<br />
				<form className="form-inline">
				  	<div className="form-group">
				    	<label className="margin-right-20">Planes</label>
				    	<div className="input-group left-50">
					   		<span className="input-group-addon"></span>
					   		<select ref="plan" size="5" multiple>{optionsHealthCarePlan}</select>
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

			// <div className="main-login main-center">
			// 	<form className="form-horizontal">
			// 		<div className="form-group">
			// 			<label className="cols-sm-2 control-label">Nombre Obra Social</label>
			// 			<div className="cols-sm-10">
			// 				<div className="input-group">
			// 					<span className="input-group-addon"></span>
			// 					<input ref="healthCare" type="text" required className="form-control" placeholder="Obra social"/>
			// 				</div>
			// 			</div>
			// 		</div>

			// 		<div className="form-group">
			// 			<label className="cols-sm-2 control-label">Email</label>
			// 			<div className="cols-sm-10">
			// 				<div className="input-group">
			// 					<span className="input-group-addon"></span>
			// 					<input ref="email" type="text" required className="form-control" placeholder="Ingrese email"/>
			// 				</div>
			// 			</div>
			// 		</div>

			// 		<div className="form-group">
			// 			<label className="cols-sm-2 control-label">Teléfono</label>
			// 			<div className="cols-sm-10">
			// 				<div className="input-group">
			// 					<span className="input-group-addon"></span>
			// 					<input ref="phone" type="text" required className="form-control" placeholder="Ingrese teléfono"/>
			// 				</div>
			// 			</div>
			// 		</div>

			// 		<div className="form-group">
			// 			<label className="cols-sm-2 control-label">Hospitales</label>
			// 			<div className="cols-sm-10">
			// 				<div className="input-group">
			// 					<span className="input-group-addon"></span>
			// 					<select ref="hospital" size="3" multiple>{optionsHospital}</select>
			// 				</div>
			// 			</div>
			// 		</div>

			// 		<div className="form-group">
			// 			<label className="cols-sm-2 control-label">Planes</label>
			// 			<div className="cols-sm-10">
			// 				<div className="input-group">
			// 					<span className="input-group-addon"></span>
			// 					<select ref="plan" size="3" multiple>{optionsHealthCarePlan}</select>
			// 				</div>
			// 			</div>
			// 		</div>

			// 		<div className="form-group login-register">
			// 			<button type="button" className="btn btn-primary login-button" onClick={this.fcConfirm}>Confirmar</button>
			// 			<button type="button" className="btn btn-primary login-button" onClick={this.fcCancel}>Cancelar</button>
			// 		</div>
			// 	</form>
			// </div>