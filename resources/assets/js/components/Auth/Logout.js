import React from 'react';
import { connect } from 'react-redux';
import RedirectIfNotAuthenticated from './RedirectIfNotAuthenticated';
import { onLogout } from "../../actions/authActions";

class Logout extends React.Component {

    componentWillMount(){
        localStorage.removeItem('token');
        this.props.logout();
    }

    render() {
        if(this.props.authenticated)
            return '';
        return <RedirectIfNotAuthenticated />;
    };
}

const mapStateToProps = (state) => {
    return  {
        authenticated: state.authReducer.authenticated,
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        logout: (data) => {
            dispatch(onLogout(data));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
