var React = require('react');
import ReactDataGrid from 'react-data-grid';
import store from '../store';
import UserStates from '../models/listed';
// const API_URL ='http://127.0.0.1:3001/';

module.exports = React.createClass ({
    getInitialState() {
		// let userState = store.getState().user.userState;
		var originalRows = [];
        var rows = [];
		this._columns = [
			{key: "hospital", name:"HOSPITAL", sortable:true},
			{key: "room", name:"SALA", sortable:true},
			{key: "qty", name:"CANTIDAD", sortable:true}
		
		];
		
		// if (userState === UserStates.LOGGED)
		// {
		// 	for(let i=0; i<stateRooms.length;i++){
		// 		columns.push({key: stateRooms[i].name, name:stateRooms[i].name, sortable:true})
		// 	}
	        
	 //        this._columns = columns;
	 //        originalRows = this.createRows();
	 //        rows = originalRows.slice(0);
  //       }
        // Store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
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
		       	<h2> Camas disponibles </h2>
				<ReactDataGrid
					onGridSort={this.handleGridSort}
		    		columns={this._columns}
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