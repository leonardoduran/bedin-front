var React = require('react');
import ReactDataGrid from 'react-data-grid';
import store from '../store';
import UserStates from '../models/listed';
const API_URL ='http://127.0.0.1:3001/';

module.exports = React.createClass ({
    getInitialState() {
		let userState = store.getState().user.userState;
		var originalRows = [];
        var rows = [];
		this._columns = [
			{key: "patient", name:"PACIENTE", sortable:true},
			{key: "healthCare", name:"OBRA SOCIAL", sortable:true},
			{key: "healthCarePlan", name:"PLAN", sortable:true},
			{key: "inputDate", name:"FECHA INGRESO", sortable:true},
			{key: "origin", name:"TIPO ORIGEN", sortable:true},
		];
        return {
            originalRows,
            rows
        };           
    },

    createRows() {
		let rows = [];
		
        return rows;
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
		let userState = store.getState().user.userState;
		if (userState === UserStates.LOGGED){
			return(
			<div>
		       	<h2> Pacientes recibidos por BEDIN </h2>
				<ReactDataGrid
					onGridSort={this.handleGridSort}
		    		columns  ={this._columns}
		    		rowGetter={this.rowGetter}
		    		rowsCount={this.state.rows.length}
		    		minHeight={300}
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