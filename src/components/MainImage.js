var React = require('react');
import './styles/MainImage.css';

module.exports = React.createClass ({
	render: function(){
		return(
			<div>
				<img src="LogoBedIn.jpg" alt="logo" className="mainImage"/>
			</div>
		)
	}
})