var React = require('react');
var Link = require('react-router').Link;

import './styles/HeaderLogin.css';
import Button from 'react-bootstrap/lib/Button';
// import bootstrap from 'react-bootstrap/';
// import bootbox from 'bootbox';
import store from '../store';
import UserStates from '../models/listed';

import { browserHistory } from 'react-router';


module.exports = React.createClass ({
	fcValidarCampos(user,pass){
		if(user===""){
			alert("Usuario no ingresado");
			return false;
		}
		if(pass===""){
			alert("Contraseña no ingresada");
			return false;
		}
		return true;
	},
	fcIniciarSesion: function(){
		// this.props.loginUser.bind(null)()
		let username=this.refs.username.value;
		let password=this.refs.userPassword.value;
		if(!this.fcValidarCampos(username,password)) return
		let user= {
			username,
			password
		}
		this.props.loginUser(user);
		// this.props.loadRooms();
	},
	fcCerrarSesion: function(){
		this.props.logoutUser()
		browserHistory.push('/#/');
	},
	fcNewUser:function(){
		console.log("New User")
	},
	fcPressPass: function(e){
         if(e.key === "Enter"){
            this.fcIniciarSesion()
         }
     },
	render: function(){
		let userState = store.getState().user.userState;
		let userRol = store.getState().user.userRol;
		if (userState !== UserStates.LOGGED){
			return(
				<div className="App-header">
					<div className="verticalCenter right">					
						<span className="formLogin">
							<i className="glyphicon glyphicon-user"></i>
							<input type="text" className="clsInputLogin" ref="username" placeholder="Usuario"></input>
							<i className="glyphicon glyphicon-lock"></i>
							<input onKeyPress={this.fcPressPass} type="password" className="clsInputLogin" ref="userPassword" placeholder="Contraseña"></input>
							<Button bsSize="small" onClick={this.fcIniciarSesion}>Iniciar sesión</Button>
							<Link   to="/RegistryUser"> Nuevo usuario </Link>
						</span>						
					</div>
				</div>
			)
		}
		else{
			return(
				<div className="App-header">
					<div className="verticalCenter right">
						<label className="labelUsername">Usuario: {this.props.user.name}</label>
						{userRol!=='admin' ? <label className="labelUsername">Institucion: {this.props.user.hospitalName}</label> : null}
						{userRol==='admin' ? <Link   to="/RegistryUser"> Nuevo usuario </Link> : null}						
						<Button bsSize="small" onClick={this.fcCerrarSesion}>Cerrar sesión</Button>
					</div>
				</div>
			)
		}
	}
})

// <Button bsSize="small" onClick={this.props.logoutUser.bind(null)}>Cerrar sesión</Button>

// <Link className="clsLinkNewUser" onClick={this.props.registryUser.bind(null)}> Nuevo usuario </Link>

// <Link   to="/RegistryUser"> Nuevo usuario </Link>
// <Button bsSize="small" onClick={this.props.loginUser.bind(null)}>Iniciar sesión</Button>