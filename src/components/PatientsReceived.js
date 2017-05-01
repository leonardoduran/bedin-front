var React = require('react');
import ReactDataGrid from 'react-data-grid';
import store from '../store';
import UserStates from '../models/listed';
import * as config from '../config/config';

module.exports = React.createClass ({
	getHour:function(aDate,aHour,gtm){
		let aH=parseInt(aHour.substring(0,2),10)
		let aM=aHour.substring(3,5)
		let aDateD=aDate.substring(8,10)
		let aDateM=aDate.substring(5,7)
		let aDateY=aDate.substring(0,4)

		aH+=gtm;
		if(aH<0){
			aH+=24;
			aDateD-=1;
			if(aDateD===0){
				aDateM-=1;
				if(aDateM===0){
					aDateY-=1;
					aDateM=12;
				}
				switch(aDateM){
					case 1:
						aDateD=31;
						break;
					case 2:
						if((aDateY%4===0 && !(aDateY%100===0)) || (aDateY%400===0))
							aDateD=29;
						else
							aDateD=28;
						break;		
					case 3:
						aDateD=31;
						break;		
					case 4:
						aDateD=30;
						break;		
					case 5:
						aDateD=31;
						break;		
					case 6:
						aDateD=30;
						break;		
					case 7:
						aDateD=31;
						break;		
					case 8:
						aDateD=31;
						break;		
					case 9:	
						aDateD=30;
						break;
					case 10:
						aDateD=31;
						break;		
					case 11:
						aDateD=30;
						break;		
					case 12:
						aDateD=31;
						break;
					default:
						break;
				}
			}
		}
		if(aH<10)
			aH="0"+aH;
		let aDateF=aDateD+"/"+aDateM+"/"+aDateY;
		return aDateF +" - "+ aH+":"+aM;
	},

	componentDidMount:function(){
    var _this = this;
	// return fetch(`${config.API_URL}patient/allRequest`, {  //(trae todos los request sin filtro por hospital)
	const hospitalID = store.getState().user.hospitalId;
	return fetch(`${config.API_URL}patient/allRequestAccept/${hospitalID}`, { 
    	  method: 'GET',
    	  credentials: 'include',
    	})
      	.then(function(response) {
        	return response.json()
      	})
      	.then(function(result) {
		let a=result;
		for (let i=0; i<a.length;i++){
			let aInputDate=a[i].inputDate;
			let aInputHour=aInputDate.substring(aInputDate.indexOf('T')+1,aInputDate.indexOf('T')+6);
			aInputDate=aInputDate.substring(0,aInputDate.indexOf('T'));
			// aInputDate=aInputDate.substring(8,10)+"/"+aInputDate.substring(5,7)+"/"+aInputDate.substring(0,4);
			aInputDate=aInputDate.substring(0,4)+"/"+aInputDate.substring(5,7)+"/"+aInputDate.substring(8,10);
			// a[i].inputDate=aInputDate +" - "+ aInputHour;
			a[i].inputDate=_this.getHour(aInputDate,aInputHour,-3)
			

			let aRespDate=a[i].responseDate;
			if (aRespDate){
				let aRespHour=aRespDate.substring(aRespDate.indexOf('T')+1,aRespDate.indexOf('T')+6);
				aRespDate=aRespDate.substring(0,aRespDate.indexOf('T'));
				// aRespDate=aRespDate.substring(8,10)+"/"+aRespDate.substring(5,7)+"/"+aRespDate.substring(0,4);
				aRespDate=aRespDate.substring(0,4)+"/"+aRespDate.substring(5,7)+"/"+aRespDate.substring(8,10);
				// a[i].responseDate=aRespDate +" - "+ aRespHour;
				a[i].responseDate=_this.getHour(aRespDate,aRespHour,-3);
			}
			else{
				a[i].responseDate="UNDEFINED"
			}
			a[i].healthCare=a[i].healthCare.name;
			a[i].healthCarePlan=a[i].healthCarePlan.name;
			a[i].origin=a[i].origin==='A' ? 'Ambulancia' : 'Derivación';
			if(a[i].responseUser)
				a[i].responseAccept=a[i].responseUser.name;
			else
				a[i].responseAccept='UNDEFINED'
		}
          _this.setState({
            originalRows:a,
            rows: a
          });
      })
	},

    getInitialState() {
		// let userState = store.getState().user.userState;
		var originalRows = [];
        var rows = [];
		this._columns = [
			{key: "patient", name:"PACIENTE", sortable:true},
			{key: "healthCare", name:"OBRA SOCIAL", sortable:true},
			{key: "healthCarePlan", name:"PLAN", sortable:true},
			{key: "inputDate", name:"FECHA INGRESO", sortable:true},
			{key: "responseDate", name:"FECHA RESPUESTA", sortable:true},
			{key: "responseAccept", name:"ACEPTACION", sortable:true},
			{key: "pathology", name:"PATOLOGIA", sortable:true},
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
		const userState = store.getState().user.userState;
		if (userState === UserStates.LOGGED){
			return(
			<div>
		       	<h2> Pacientes recibidos por BEDIN </h2>
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