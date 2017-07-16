import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import MainContainer from './components/MainContainer';

import PatientsRequest from './components/PatientsRequest';
import PatientsReceived from './components/PatientsReceived';
// import OfferBeds from './components/OfferBeds';
// import Offer from './components/Offer';
// import ShowBeds from './components/ShowBeds';
import RegistryUser from './components/RegistryUser';
import AddPatientRequest from './components/AddPatientRequest';
import AddHospital from './components/AddHospital';
import AddHealthCare from './components/AddHealthCare';
import AddHealthCarePlan from './components/AddHealthCarePlan';

import './index.css';

import {Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';

import {saveState} from './localStorage';
var browserHistory = require('react-router').browserHistory

store.subscribe(() =>{
	saveState(store.getState());
})

const router = (
	<Provider store={store}> 
		<Router history={browserHistory}>
			<Route path='/' component={App}> 
				
				<IndexRoute component={MainContainer}></IndexRoute>
				<Route path='PatientsRequest' component={PatientsRequest} />
				<Route path='PatientsReceived' component={PatientsReceived} />
				<Route path='RegistryUser' component={RegistryUser} />
				<Route path='AddPatientRequest' component={AddPatientRequest} />
				<Route path='AddHospital' component={AddHospital} />
				<Route path='AddHealthCare' component={AddHealthCare} />
				<Route path='AddHealthCarePlan' component={AddHealthCarePlan} />
			</Route>
		</Router>
	</Provider>
)

render(router , document.getElementById('root'));


			// <Route path='/' component={App}> 
				
			// 	<IndexRoute component={MainContainer}></IndexRoute>
			// 	<Route path='PatientsRequest' component={PatientsRequest} />
			// 	<Route path='PatientsReceived' component={PatientsReceived} />
			// 	<Route path='OfferBeds' component={OfferBeds} />
			// 	<Route path='OfferBeds/Offer/:room/:available/:available_soon' component={Offer} />
			// 	<Route path='ShowBeds' component={ShowBeds} />
			// 	<Route path='RegistryUser' component={RegistryUser} />
			// 	<Route path='AddPatientRequest' component={AddPatientRequest} />
			// 	<Route path='AddHospital' component={AddHospital} />
			// 	<Route path='AddHealthCare' component={AddHealthCare} />
			// 	<Route path='AddHealthCarePlan' component={AddHealthCarePlan} />
			// </Route>