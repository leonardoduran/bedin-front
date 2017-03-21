// var React = require('react');
// import MainImage from '../components/MainImage';
// import RegistryUser from '../components/RegistryUser';
// import OfferBeds from './OfferBeds';
// import ShowBeds from './ShowBeds';
// import PatientsReceived from './PatientsReceived';
// import PatientsRequest from './PatientsRequest';
// import store from '../store';
// import UserStates from '../models/listed';

// module.exports = React.createClass ({
// 	render: function(){
// 	let userState = store.getState().user.userState;

// 	switch(userState){
// 		case UserStates.LOGGED:
// 			// Si el usuario esta logueado, me fijo sobre que menú está e usuario y muestro esa página
//       			return (<div></div>)

// 		case UserStates.UNLOGGED:
// 			return(<div><MainImage /></div>);

// 		case UserStates.IS_LOGGEDIN:
// 			return(<div><img src="loading.gif" alt="Cargando" className="gifLoading"/></div>);

// 		case UserStates.IS_UNLOGGEDIN:
// 			return(<div><img src="loading.gif" alt="Cargando" className="gifLoading"/></div>);

// 		case UserStates.IS_REGISTRING:
// 			return(<div><RegistryUser {...this.props}/></div>);

// 		default:
// 			return(<div><MainImage /></div>);
// 	}
//   }
// })
