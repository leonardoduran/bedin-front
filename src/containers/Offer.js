var React = require('react');
var Link = require('react-router').Link;
import store from '../store';
import UserStates from '../models/listed';
import '../components/styles/Offer.css';

module.exports = React.createClass ({
	fcOfferBeds: function(){
		let qty=this.refs.qtyOffer.value;
		this.props.offerBeds(qty);
	},
	fcReleaseBeds: function(){
		let qty=this.refs.qtyOffer.value;
		this.props.releaseBeds(qty);
	},
	render: function(){
	const {params} = this.props
	let userState = store.getState().user.userState;
	if (userState === UserStates.LOGGED){
		return(
			<div>
		       	<h1><strong>{store.getState().user.hospitalName}</strong></h1>
		       	<h2><strong>Sala {params.room}</strong></h2>
		       	<br />
		       	<div className="clsContent">
			       	<h3>Disponibles {params.available}</h3>	       
			       	<h3>Disponibles próximamente {params.available_soon}</h3>
			       	<div>
				       	<input type="number" ref="qtyOffer"></input>
				       	<button onClick={this.fcOfferBeds}> Ofertar </button>
				       	<button onClick={this.fcReleaseBeds}> Liberar </button>
					</div>
					<br />
					<br />
				</div>
		       	<div className="clsRigth"><Link  to="/OfferBeds">Volver</Link></div>
			</div>
		)
	}
	else {
		return(<div>
		<h1>Usuario no logueado</h1>
		</div>
		)
	}

	}
})

