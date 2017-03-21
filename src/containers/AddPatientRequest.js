var React = require('react');
import { browserHistory } from 'react-router';
import ReactDataGrid from 'react-data-grid';
import store from '../store';
import UserStates from '../models/listed';
const API_URL ='http://127.0.0.1:3001/';

module.exports = React.createClass ({
	fcCancel:function(){
		browserHistory.push('/');
	},
  getInitialState: function() {
    return {
		healthCare:[],
		healthCarePlan:[],
		priority:[],
		originType:[]
    }
  },	
	componentDidMount:function(){

    var _this = this;

    _this.setState({
        priority  :[{id:1, name:'Alta'},{id:2, name:'Media'},{id:3, name:'Baja'}],
        originType:[{id:'A', name:'Ambulancia'},{id:'P',name:'Paciente'}]

    });    
    // fetch(`${API_URL}healthCarePlans`, { 
    //     method: 'GET',
    // })
    //   .then(function(response) {
    //     return response.json()
    //   })
    //   .then(function(result) {
    //       console.log('Plan',result)
    //       _this.setState({
    //         healthCarePlan: result
    //       });
    //   })
    return fetch(`${API_URL}healthCare`, { 
        method: 'GET',
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(result) {
          console.log(result)
          _this.setState({
            healthCare: result
          });
      })      
	},

	render: function(){	
		let optionsHealthCare=[];
		let optionsHealthCarePlan=[];
		let optionsPriority=[];
		let optionsOriginType=[];
    	if(this.state.priority.length>0)
	    	for (let i = 0; i < this.state.priority.length; i++) {
	            let option = this.state.priority[i];        
	        	optionsPriority.push(
	                <option key={option.id} value={i}>{option.name}</option>)
	        };

    	if(this.state.originType.length>0)
	    	for (let i = 0; i < this.state.originType.length; i++) {
	            let option = this.state.originType[i];        
	        	optionsOriginType.push(
	                <option key={option.id} value={i}>{option.name}</option>)
	        };

    	if(this.state.healthCarePlan.length>0)
	    	for (let i = 0; i < this.state.healthCarePlan.length; i++) {
	            let option = this.state.healthCarePlan[i];        
	        	optionsHealthCarePlan.push(
	                <option key={option.id} value={i}>{option.name}</option>)
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

					<div className="form-group">
						<label className="cols-sm-2 control-label">Obra social</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<select ref="healthCare">{optionsHealthCare}</select>
							</div>
						</div>
					</div>


					<div className="form-group">
						<label className="cols-sm-2 control-label">Plan</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<select ref="healthCarePlan">{optionsHealthCarePlan}</select>
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
						<button type="button" className="btn btn-primary login-button" onClick={this.fcRegistry}>Confirmar</button>
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