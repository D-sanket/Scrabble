import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class RedirectIfNotAuthenticated extends React.Component {

    render() {
        if(this.props.authenticated){
            return (
                <Redirect to="/"/>
            );
        }
        return '';
    };
}

const mapStateToProps = (state) => {
    return  {
        authenticated: state.authReducer.authenticated
    }
};


export default connect(mapStateToProps)(RedirectIfNotAuthenticated);


