import React from 'react';
import AuthHeader from './AuthHeader';
import MainHeader from './MainHeader';
import { connect } from 'react-redux';

class Header extends React.Component {

    render() {
        if(this.props.authenticated)
            return <MainHeader/>;
        return <AuthHeader/>;
    };
}

const mapStateToProps = (state) => {
    return  {
        authenticated: state.authReducer.authenticated,
    }
};

export default connect(mapStateToProps)(Header);
