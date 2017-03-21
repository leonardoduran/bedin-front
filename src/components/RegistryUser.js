var React = require('react');
import { browserHistory } from 'react-router';
// import HeaderLogin from '../components/HeaderLogin';
// import GeneralFooter from '../components/GeneralFooter';
// import NAV from '../components/NAV';
import './styles/RegistryUser.css';
// import UserStates from '../models/listed';
import store from '../store';
// var Link = require('react-router').Link;

export const API_URL ='http://127.0.0.1:3001/';

module.exports = React.createClass ({
	validarCampos:function(){
		let name=this.refs.name.value;
		let userName=this.refs.userName.value;
		let password=this.refs.password.value;
		let password2=this.refs.password2.value;
		let hospitalCode = this.refs.hospital.value;
		if(name==="" || userName==="" || password==="" || password2==="" || hospitalCode===""){
			alert("Todos los campos son obligatorios");
			return false;
		}
		
		if(password!==password2){
			alert("Las contraseñas no coinciden");
			return false;
		}
		return true;
	},
	fcRegistry: function(){
		if(!this.validarCampos()) return;
		
		let name=this.refs.name.value;
		let userName=this.refs.userName.value;
		let hospitalCode = this.refs.hospital.value;
		console.log(hospitalCode)
		let password=this.refs.password.value;
		let password2=this.refs.password2.value;			
		let user= {
			name,
			userName,
			hospitalCode,
			password,
			password2
		}
		this.props.registeringUser(user); // action
		this.refs.name.value=''
		this.refs.hospital.value=1
		this.refs.userName.value=''
		this.refs.password.value=''
		this.refs.password2.value=''
	},
	fcCancelRegistry:function(){
		browserHistory.push('/');
	},

  getInitialState: function() {
    return {
      hospitals: []
    }
  },	
	componentDidMount:function(){

    var _this = this;

    return fetch(`${API_URL}hospitals`, { 
        method: 'GET',
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(result) {
          _this.setState({
            hospitals: result
          });
      })
	},
	render: function(){
		let optionsHospital=[];
		// hospitals: tengo que traerlos del API mediante un request
    	if(this.state.hospitals.length>0)
	    	for (let i = 0; i < this.state.hospitals.length; i++) {
	            let option = this.state.hospitals[i];        
	        	optionsHospital.push(
	                <option key={i} value={option._id}>{option.name}</option>)
	        };

		let botones;
		if (store.getState().user.isRegistering){
			botones=<div>
						<img src="loading.gif" alt="Cargando" className="gifLoading"/>
					</div>
		}else{
			botones=<div>
						<button type="button" className="btn btn-primary login-button" onClick={this.fcRegistry}>Confirmar</button>
						<button type="button" className="btn btn-primary login-button" onClick={this.fcCancelRegistry}>Cancelar</button>
					</div>
		}
		return(
		<div>

			<div className="main-login main-center">
				<form className="form-horizontal">
					<div className="form-group">
						<label className="cols-sm-2 control-label">Nombre</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<input ref="name" type="text" required className="form-control" name="name" id="name" placeholder="Ingrese su nombre"/>
							</div>
						</div>
					</div>

					<div className="form-group">
						<label className="cols-sm-2 control-label">Nombre de usuario</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<input ref="userName" type="text" required className="form-control" name="username" id="username"  placeholder="Ingrese su nombre de usuario"/>
							</div>
						</div>
					</div>

					<div className="form-group">
						<label className="cols-sm-2 control-label">Institución</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<select ref="hospital">{optionsHospital}</select>

							</div>
						</div>
					</div>

					<div className="form-group">
						<label className="cols-sm-2 control-label">Contraseña</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<input ref="password" type="password" required className="form-control" name="password" id="password"  placeholder="Ingrese su Contraseña"/>
							</div>
						</div>
					</div>

					<div className="form-group">
						<label className="cols-sm-2 control-label">Confirmar Contraseña</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"></span>
								<input ref="password2" type="password" required className="form-control" name="confirm" id="confirm"  placeholder="Confirme su Contraseña"/>
							</div>
						</div>
					</div>

					<div className="form-group login-register">
						{botones}
					</div>
				</form>
			</div>
		</div>
		)
	}
})



// <Link  className="clsButton"  activeClassName="active" to="/"> LNK CANCELAR </Link>

// <select ref="hospital" required className="form-control" />
								// <Combo
								//   dataSource={hospitals}
								//   idProperty="id"
								//   displayProperty="name"
								//   multiselect="false"
								// />

