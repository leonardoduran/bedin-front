var React = require('react');
import { browserHistory } from 'react-router';
import store from '../store';
import UserStates from '../models/listed';
import '../components/styles/AddPatientRequest.css';
import * as config from '../config/config';


module.exports = React.createClass ({
	
	validarCampos: function(){
		
		let patient=this.refs.patient.value;
		let healthCare=this.refs.healthCare.value;
		let healthCarePlan=this.refs.healthCarePlan.value;
		let pathology=this.refs.pathology.value;
		let priority=this.refs.priority.value;
		let origin=this.refs.originType.value;
		let hospitalID=this.refs.hospital.value;
		if(patient===''){
			alert('Paciente no ingresado')
			this.refs.patient.focus();
			return false;
		}
		if(healthCare===''){
			alert('Obra social no ingresada')
			this.refs.healthCare.focus();
			return false;
		}
		if(healthCarePlan===''){
			alert('Plan no ingresado')
			this.refs.healthCarePlan.focus();
			return false;
		}
		if(pathology===''){
			alert('Patología no ingresada')
			this.refs.pathology.focus();
			return false;
		}
		if(priority===''){
			alert('Prioridad no ingresada')
			this.refs.priority.focus();
			return false;
		}
		if(origin===''){
			alert('Origen no ingresado')
			this.refs.origin.focus();
			return false;
		}
		if(hospitalID===''){
			alert('Hospital no ingresado')
			this.refs.hospitalID.focus();
			return false;
		}
		return true;
	},

	fcConfirm: function(){
		if(!this.validarCampos()) return;
		
		let patient=this.refs.patient.value;
		let healthCare=this.refs.healthCare.value;
		let healthCarePlan=this.refs.healthCarePlan.value;
		let pathology=this.refs.pathology.value;
		let priority=this.refs.priority.value;
		let origin=this.refs.originType.value;
		let hospitalID=this.refs.hospital.value;

		let request= {
			patient,
			healthCare,
			healthCarePlan,
			pathology,
			priority,
			origin,
			hospitalID
		}
		this.props.addingPatient(request); // action
		this.refs.patient.value=''
		this.refs.healthCare.value=''
		this.refs.healthCarePlan.value=''
		this.refs.hospital.value=''
		this.refs.pathology.value=''
		this.refs.priority.value=''
		this.refs.originType.value=''
	},

	fcCancel:function(){
		browserHistory.push('/');
	},
  	
  	getInitialState: function() {
    return {
		healthCare:[],
		healthCarePlan:[],
		priority:[],
		originType:[],
		hospitals:[]
    	}
  	},	
	
	componentDidMount:function(){

	    var _this = this;

	    _this.setState({
	        priority  :[{id:1, name:'Alta'},{id:2, name:'Media'},{id:3, name:'Baja'}],
	        originType:[{key:'A', name:'Ambulancia'},{key:'P',name:'Paciente'}]
	    });


		var getPlans = function() {
		   var promise = new Promise(function(resolve, reject){
			fetch(`${config.API_URL}healthCarePlans`, { 
	        method: 'GET',
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

		var getHealthCares = function() {
		   var promise = new Promise(function(resolve, reject){
			fetch(`${config.API_URL}healthCare`, { 
	        method: 'GET',
	    	})	
	      	.then(function(response) {
	        	return response.json()
	      	})
	      	.then(function(result) {
	          _this.setState({
	            healthCare: result
	          });
	      })
		   });
		   return promise;
		};

		var getHospitals = function() {
		   var promise = new Promise(function(resolve, reject){
			fetch(`${config.API_URL}hospitals`, { 
	        method: 'GET',
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


		Promise.all([getPlans(), getHealthCares(),getHospitals()])
		.then(function(resultado){
			console.log("PASO!")
			console.log(resultado); //un arreglo con los valores pasamos a resolve en cada metodo
		})
		.catch( function(err){
			console.log("ERROR!")
			console.warn(err); //mostramos el error por consola. Veremos que es el que falló primero, o sea el del primer metodo
		});   
	},

	fcChangeOS: function(e){
		// console.log(this.refs.healthCare.value)
		// Si tengo guardado en el State los planes, cuando los vuelva a buscar,
		// se deberia renderizar automaticamente el combo
		var _this=this;
		return fetch(`${config.API_URL}patient/formadd/${this.refs.healthCare.value}`, { 
	        method: 'GET',
	    	})	
	      	.then(function(response) {
	        	return response.json()
	      	})
	      	.then(function(result) {
	          _this.setState({
	            healthCarePlan: result[0].plans,
	            hospitals: result[0].hospitals
	          });
			});
	},


	render: function(){	
		let optionsHealthCare=[];
		let optionsHealthCarePlan=[];
		let optionsPriority=[];
		let optionsOriginType=[];
		let optionsHospital=[]
    	if(this.state.priority.length>0)
	    	for (let i = 0; i < this.state.priority.length; i++) {
	            let option = this.state.priority[i];        
	        	optionsPriority.push(
	                <option key={i} value={option.id}>{option.name}</option>)
	        };

    	if(this.state.originType.length>0)
	    	for (let i = 0; i < this.state.originType.length; i++) {
	            let option = this.state.originType[i];        
	        	optionsOriginType.push(
	                <option key={i} value={option.key}>{option.name}</option>)
	        };

    	if(this.state.healthCarePlan.length>0)
	    	for (let i = 0; i < this.state.healthCarePlan.length; i++) {
	            let option = this.state.healthCarePlan[i];        
	        	optionsHealthCarePlan.push(
	                <option key={i} value={option._id}>{option.name}</option>)
	        };
    	
    	if(this.state.healthCare.length>0)
	    	for (let i = 0; i < this.state.healthCare.length; i++) {
	            let option = this.state.healthCare[i];        
	        	optionsHealthCare.push(
	                <option key={i} value={option._id}>{option.name}</option>)
	        };

    	if(this.state.hospitals.length>0)
	    	for (let i = 0; i < this.state.hospitals.length; i++) {
	            let option = this.state.hospitals[i];        
	        	optionsHospital.push(
	                <option key={i} value={option._id}>{option.name}</option>)
	        };	        

		let userState = store.getState().user.userState;
		if (userState === UserStates.LOGGED){
			return(
			<div>
			<div className="main-login main-center">
				<form className="form-horizontal">
					<div className="form-group">
						<label className="cols-sm-2 control-label">Paciente</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<input ref="patient" type="text" required className="form-control" placeholder="Nombre paciente"/>
							</div>
						</div>
					</div>

				<label className="control-label left-15">Obra social</label>
				<form className="form-inline">
					
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<select ref="healthCare" onChange={this.fcChangeOS}>{optionsHealthCare}</select>
							</div>

							<div className="input-group">
								<span className="input-group-addon"></span>
								<select ref="healthCarePlan">{optionsHealthCarePlan}</select>
							</div>
						</div>
				</form>

					<div className="form-group">
						<label className="cols-sm-2 control-label">Hospital</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<select ref="hospital">{optionsHospital}</select>
							</div>
						</div>
					</div>

					<div className="form-group">
						<label className="cols-sm-2 control-label">Patología</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<input ref="pathology" type="text" required className="form-control" placeholder="Patología"/>
							</div>
						</div>
					</div>

					<div className="form-group">
						<label className="cols-sm-2 control-label">Prioridad</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<select ref="priority">{optionsPriority}</select>
							</div>
						</div>
					</div>

					<div className="form-group">
						<label className="cols-sm-2 control-label">Tipo origen</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<select ref="originType">{optionsOriginType}</select>
							</div>
						</div>
					</div>

					<div className="form-group login-register">
						<button type="button" className="btn btn-primary login-button" onClick={this.fcConfirm}>Confirmar</button>
						<button type="button" className="btn btn-primary login-button" onClick={this.fcCancel}>Cancelar</button>
					</div>
				</form>
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