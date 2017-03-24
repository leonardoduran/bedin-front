var React = require('react');
import ReactDataGrid from 'react-data-grid';
import store from '../store';
import UserStates from '../models/listed';
import * as config from '../config/config';
import '../components/styles/PatientsRequest.css';

module.exports = React.createClass ({
    
	fcClickRequest:function(index){
		// if(index>=0){ // No presiono el Header de la grilla
		// 	console.log(index)
		// 	console.log(this.rowGetter(index)["_id"])
		// }

		return fetch(`${config.API_URL}patient/prueba`, { 
    	  method: 'GET',
    	})
      	.then(function(response) {
        	return response.json()
      	})
      	.then(function(result) {
      		console.log(result)
      })
	},
	componentDidMount:function(){
    var _this = this;
	// return fetch(`${config.API_URL}patient/allRequest`, {  //(trae todos los request sin filtro por hospital)
	const hospitalID = store.getState().user.hospitalId;
	return fetch(`${config.API_URL}patient/allRequest/${hospitalID}`, { 
    	  method: 'GET',
    	})
      	.then(function(response) {
        	return response.json()
      	})
      	.then(function(result) {
		let a=result;
		for (let i=0; i<a.length;i++){
			let aDate=a[i].inputDate;
			let aHour=aDate.substring(aDate.indexOf('T')+1,aDate.indexOf('T')+6);
			aDate=aDate.substring(0,aDate.indexOf('T'));
			aDate=aDate.substring(8,10)+"/"+aDate.substring(5,7)+"/"+aDate.substring(0,4);
			a[i].healthCare=a[i].healthCare.name;
			a[i].healthCarePlan=a[i].healthCarePlan.name;
			a[i].inputDate=aDate +" - "+ aHour;
			a[i].priority=a[i].priority===1 ? 'Alta' : (a[i].priority===2 ? 'Media' : 'Baja');
			a[i].origin=a[i].origin==='A' ? 'Ambulancia' : 'Paciente';
		}
          _this.setState({
            originalRows:a,
            rows: a
          });
      })
	},

    getInitialState() {
		var originalRows = [];
        var rows = [];
		this._columns = [
			{key: "_id", name:"ID",width:205},
			{key: "patient", name:"PACIENTE",resizable:true, sortable:true},
			{key: "healthCare", name:"OBRA SOCIAL", sortable:true},
			{key: "healthCarePlan", name:"PLAN", sortable:true},
			{key: "pathology", name:"PATOLOGIA",resizable:true,sortable:true},
			{key: "inputDate", name:"FECHA INGRESO", sortable:true,width:150},
			{key: "priority", name:"PRIORIDAD", sortable:true},
			{key: "origin", name:"TIPO ORIGEN", sortable:true},
			// {key: "originName", name:"REALIZADO POR", sortable:true},
		];

        return {
            originalRows,
            rows
        };           
    },

    handleGridSort(sortColumn, sortDirection) {
        const comparer = (a, b) => {
        	if (sortDirection === 'ASC') {
            	return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
        	} else if (sortDirection === 'DESC') {
            	return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
        	}
   		};
    	const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
    	this.setState({
            rows
	    });
    },
    
    rowGetter(i) {
        return this.state.rows[i];
    },

	render: function(){	
		const userState = store.getState().user.userState;
		if (userState === UserStates.LOGGED){
			return(
			<div>
				<h2>Solicitudes de pacientes</h2>
				<ReactDataGrid
					onGridSort={this.handleGridSort}
		    		columns={this._columns}
		    		rowGetter={this.rowGetter}
		    		rowsCount={this.state.rows.length}
		    		minHeight={400}
		    		onRowClick={this.fcClickRequest}
		    	/>
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

				// <form className="form-inline">
				//   	<div className="form-group">
				//     	<label className="input-group font-h2"> Solicitudes de pacientes </label>
				//     	<div className="input-group clsRigth"><button>Nueva solicitud</button></div>
				//     </div>
				// </form>