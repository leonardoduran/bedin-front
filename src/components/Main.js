var React = require('react');
import './styles/Main.css';

import HeaderLogin from './HeaderLogin';
import GeneralFooter from './GeneralFooter';
// import Content from '../containers/Content';
import Loading from './loading';
import NAV from './NAV';
import UserStates from '../models/listed';
import store from '../store';

module.exports = React.createClass ({
	
	// componentWillReceiveProps(nextProps) {
	// console.log("Ejecuto", nextProps.children)
	//     this.setState({
	//         children: nextProps.children
	//     });
	// },

	render: function(){
		let userState = store.getState().user.userState;
		if (userState === UserStates.IS_LOGGEDIN || userState === UserStates.IS_UNLOGGEDIN){
			return(
				<div>
					<HeaderLogin {...this.props}/>
					<NAV />
					<div className="container main-center">
                    	<Loading />
                	</div>

				</div>
			)
		}
		return(
			<div>
				<HeaderLogin {...this.props}/>
				<NAV />                
				<div className="container">
                    {React.cloneElement(this.props.children, this.props)}
                </div>


			</div>
		)
	}
})

				// <div>
					// {React.cloneElement(this.props.children, this.props)}
				// </div>


                // <div className="container">
                //     {this.props.children}
                // </div>