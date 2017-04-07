var React = require('react');
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;
import './styles/NAV.css';

import store from '../store';
import UserStates from '../models/listed';

module.exports = React.createClass ({
   handleSelect(selectedKey) {
    alert('selected ' + selectedKey);
  },
  // onSelect={this.handleSelect}
  render: function () {
	let userState = store.getState().user.userState;
  let userRol = store.getState().user.userRol;
	if (userState === UserStates.LOGGED){
    if (userRol === 'user')
    return (
      <div className="clsNav">
          <IndexLink  className="clsButton clsButton2"  activeClassName="active" to="/PatientsRequest"> Solicitud pendientes </IndexLink>
          <Link  className="clsButton clsButton2"  activeClassName="active" to="/PatientsReceived"> Pacientes aceptados </Link>
      </div>
      )
      else
    return (
      <div className="clsNav">
          <IndexLink  className="clsButton clsButton4"  activeClassName="active" to="/AddPatientRequest"> Generar solicitud </IndexLink>
          <IndexLink  className="clsButton clsButton4"  activeClassName="active" to="/AddHospital"> Agregar Hospital </IndexLink>
          <IndexLink  className="clsButton clsButton4"  activeClassName="active" to="/AddHealthCarePlan"> Agregar Plan </IndexLink>
          <IndexLink  className="clsButton clsButton4"  activeClassName="active" to="/AddHealthCare"> Agregar Obra Social </IndexLink>
      </div>
      )
    
	}else
	return(<div></div>)
  }
})

          // <Link  className="clsButton clsButton4"  activeClassName="active" to="/OfferBeds"> Ofertar camas </Link>
          // <Link  className="clsButton clsButton4"  activeClassName="active" to="/ShowBeds"> Ver camas disponibles </Link>
