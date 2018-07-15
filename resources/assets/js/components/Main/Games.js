import React from 'react';
import { connect } from 'react-redux';
import RedirectIfNotAuthenticated from '../Auth/RedirectIfNotAuthenticated';

class Games extends React.Component {

    render() {
        return (
            <div>
                <RedirectIfNotAuthenticated />
                Games
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return  {
        authenticated: state.authReducer.authenticated,
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);
