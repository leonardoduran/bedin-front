var React = require('react');
import './styles/MainImage.css';

module.exports = React.createClass ({
	render: function(){
		return(
			<div>
				<img src="logobdin.png" alt="logo" className="mainImage"/>
			</div>
		)
	}
})