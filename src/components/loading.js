var React = require('react');
import './styles/loading.css';

module.exports = React.createClass ({
	render: function(){
		return(
			<div className="clsContainerGif">
				<img src="loading.gif" alt="Cargando" className="gifLoading"/>
			</div>
		)
	}
})