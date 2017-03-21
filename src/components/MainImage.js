var React = require('react');
import './styles/MainImage.css';
var Link = require('react-router').Link;

module.exports = React.createClass ({
	render: function(){
		return(
			<div>
				<img src="LogoBedIn.jpg" alt="logo" className="mainImage"/>
			</div>
		)
	}
})