var React = require('react');
// import hospitals from '../data/hospitals';
import rooms from '../data/rooms';
import stateRooms from '../data/statesRoom';

import ReactDataGrid from 'react-data-grid';
import '../components/styles/OfferBeds.css';
// import Offer from './Offer';
import { browserHistory } from 'react-router';
import store from '../store';
import UserStates from '../models/listed';
import * as config from '../config/config';

module.exports = React.createClass ({

	fcClick_no:function(ix){
		console.log("param", ix)
		// console.log("state", this.state)
		// console.log("rowIdx", this.state.rowIdx)
		// console.log("click", this.rowGetter(0))
	},
	fcClick:function(index){
		if(index>=0){ // No presiono el Header de la grilla
			let available=this.rowGetter(index)["DISPONIBLE"];
			let available_soon=this.rowGetter(index)["DISPONIBLE PROXIMAMENTE"];
			let nameRoom=this.rowGetter(index)["room"];
			browserHistory.push(`/OfferBeds/Offer/${nameRoom}/${available}/${available_soon}`)
		}
	},


	 //    var columns = 	[{key: "room", name:"SALA", sortable:true}];
		// for(let i=0; i<stateRooms.length;i++){
		// 	columns.push({key: stateRooms[i].name, name:stateRooms[i].name, sortable:true})
		// }
		// return columns;

	getDefaultProps_() {
		console.log("default props")
	    var self = this;
		fetch(`${config.API_URL}rooms`, { 
		    method: 'GET',
		    })
		    .then(function(response) {
		        return response.json()
		    })
		    .then(function(body) {
		      	// console.log(body)
		      	self._columns = 	[{key: "room", name:"SALA", sortable:true}];
		      	var stateRooms2 = body.data;
				for(let i=0; i<stateRooms2.length;i++){
					self._columns.push({key: stateRooms2[i].name, name:stateRooms2[i].name, sortable:true})
				console.log(self._columns)
				}
		    })


	    // this.props.items.map((item) => {
	    //     ImageStore.getImageById(item.imageId).then(image => {
	    //         var mapping = {id: item.imageId, url: image.url};
	    //         var newUrls = self.state.imageUrls.slice().push(mapping)
	    //         self.setState({
	    //             imageUrls: newUrls
	    //         });
	    //     })
	    // });
	},


    getInitialState() {
		let userState = store.getState().user.userState;
		var originalRows = [];
        var rows = [];
        this.columns= [];
		var columns = 	[{key: "room", name:"SALA", sortable:true}];
		if (userState === UserStates.LOGGED)
		{
			for(let i=0; i<stateRooms.length;i++){
				columns.push({key: stateRooms[i].name, name:stateRooms[i].name, sortable:true})
			}
		// columns.push(
		// {
	 	//  	key: 'btnOffer',
	 	//  	name: '',
	 	//  	width: 120,
	 	//  	formatter:<button  onClick={this.fcClick_no}>Ofertar</button>
		// })
	        this._columns = columns;
	        originalRows = this.createRows();
	        rows = originalRows.slice(0);
        }
        // Store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
        return {
            originalRows,
            rows
        };           
    },

    createRows() {
		let rows = [];
		
		// rooms: tengo que traerlas del API mediante un request

		for(let ixRoom=0; ixRoom<rooms.length;ixRoom++){
			var nameRoom=rooms[ixRoom].name;
			var tmpRow={room: nameRoom};
			let tmpQty=0;
			for(let ixBed=0; ixBed<rooms[ixRoom].beds.length;ixBed++){
				let stateBed = rooms[ixRoom].beds[ixBed].state;
				let qty = rooms[ixRoom].beds[ixBed].qty;
				tmpQty+=qty;
				tmpRow[stateBed] =qty;
			}
			tmpRow['TOTAL'] =tmpQty;
			rows.push(tmpRow);
		}
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
		       	<h2> Camas por sala</h2>
				<ReactDataGrid
					onGridSort={this.handleGridSort}
		    		columns={this._columns}
		    		rowGetter={this.rowGetter}
		    		rowsCount={this.state.rows.length}
		    		minHeight={300}
		            onRowClick={this.fcClick}
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