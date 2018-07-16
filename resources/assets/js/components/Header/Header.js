import React from 'react';
import AuthHeader from './AuthHeader';
import MainHeader from './MainHeader';
import { connect } from 'react-redux';
import {getToken} from "../../core";

class Header extends React.Component {

    constructor(){
        super();
    }

    componentDidMount(){
        const self = this;
        axios.post('/api/user', { token: getToken() })
            .then(function (response) {
                const id = response.data.id;
                Echo.channel('challenge.'+id)
                    .listen('ChallengeReceived', (e) => {
                        console.log("Notified", e);
                    });
                console.log("Listening on challenge-received."+id+"...");
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    render() {
        if(this.props.authenticated)
            return <MainHeader unreads={this.state.unreads}/>;
        return <AuthHeader/>;
    };
}

const mapStateToProps = (state) => {
    return  {
        authenticated: state.authReducer.authenticated,
    }
};

export default connect(mapStateToProps)(Header);
