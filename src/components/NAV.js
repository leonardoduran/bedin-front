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
          <IndexLink  className="clsButton clsButton4"  activeClassName="active" to="/PatientsRequest"> Solicitud pacientes </IndexLink>
          <Link  className="clsButton clsButton4"  activeClassName="active" to="/OfferBeds"> Ofertar camas </Link>
          <Link  className="clsButton clsButton4"  activeClassName="active" to="/ShowBeds"> Ver camas disponibles </Link>
          <Link  className="clsButton clsButton4"  activeClassName="active" to="/PatientsReceived"> Pacientes recibidos </Link>
      </div>
      )
      else
    return (
      <div className="clsNav">
          <IndexLink  className="clsButton clsButton1"  activeClassName="active" to="/AddPatientRequest"> Agregar Paciente </IndexLink>
      </div>
      )
    
	}else
	return(<div></div>)
  }
})

// <Link  onClick={this.props.patientsRequest.bind(null)} className="clsButton"  activeClassName="active"> Solicitud pacientes </Link>
// <Link  className="clsButton"  activeClassName="active" to="/PatientsRequest"> Solicitud pacientes </Link>