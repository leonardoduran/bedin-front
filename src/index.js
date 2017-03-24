import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import MainContainer from './containers/MainContainer';

import PatientsRequest from './containers/PatientsRequest';
import PatientsReceived from './containers/PatientsReceived';
import OfferBeds from './containers/OfferBeds';
import Offer from './containers/Offer';
import ShowBeds from './containers/ShowBeds';
import RegistryUser from './components/RegistryUser';
import AddPatientRequest from './containers/AddPatientRequest';
import AddHospital from './containers/AddHospital';
import AddHealthCare from './containers/AddHealthCare';
import AddHealthCarePlan from './containers/AddHealthCarePlan';

import './index.css';

// import react router
import {Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import store, {history} from './store';

const router = (
	<Provider store={store}> 
		<Router history={history}>
			<Route path='/' component={App}> 
				
				<IndexRoute component={MainContainer}></IndexRoute>
				<Route path='PatientsRequest' component={PatientsRequest} />
				<Route path='PatientsReceived' component={PatientsReceived} />
				<Route path='OfferBeds' component={OfferBeds} />
				<Route path='OfferBeds/Offer/:room/:available/:available_soon' component={Offer} />
				<Route path='ShowBeds' component={ShowBeds} />
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

// <Route path='RegistryUser' component={RegistryUser} />