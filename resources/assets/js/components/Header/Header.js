import React from 'react';
import AuthHeader from './AuthHeader';
import MainHeader from './MainHeader';
import { connect } from 'react-redux';
import {getToken} from "../../core";
import { onNotificationReceived } from '../../actions/notificationActions';

class Header extends React.Component {

    componentDidMount(){
        const self = this;
        axios.post('/api/user', { token: getToken() })
            .then(function (response) {
                const id = response.data.id;
                Echo.channel('challenge.'+id)
                    .listen('ChallengeReceived', (e) => {
                        console.log("Notified", e);
                        self.props.onNotificationReceived(e);
                    });
                console.log("Listening on challenge-received."+id+"...");
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    render() {
        if(this.props.isGameOn)
            return '';
        if(this.props.authenticated)
            return <MainHeader unreads={this.props.unreadNotifications}/>;
        return <AuthHeader/>;
    };
}

const mapStateToProps = (state) => {
    return  {
        authenticated: state.authReducer.authenticated,
        unreadNotifications: state.notificationReducer.unread,
        isGameOn: state.gameReducer.isGameOn
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        onNotificationReceived: (data) => {
            dispatch(onNotificationReceived(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
