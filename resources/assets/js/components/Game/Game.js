import React from 'react';
import M from 'materialize-css';
import { connect } from 'react-redux';
import { onGameContinued, onGameClosed } from "../../actions/gameActions";
import {getToken, store} from "../../core";
import $ from "jquery";
import RedirectIfNotAuthenticated from '../Auth/RedirectIfNotAuthenticated';
import Loader from './Loader';
import GameHeader from './GameHeader';
import Board from "./Board";


class Game extends React.Component{
    componentWillMount(){
        const self = this;
        const { id } = this.props.match.params;

        this.props.onGameContinued(`${id}`);
    }

    componentWillUnmount(){
        this.props.onGameClosed();
    }

    render(){
        if(this.props.loading){
            return (
                <div>
                    <RedirectIfNotAuthenticated/>
                    <Loader />
                </div>
            );
        }
        return (
            <div className={"gameContainer black-text white"}>
                <RedirectIfNotAuthenticated />
                <GameHeader data={this.props.data}/>
                <Board/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return  {
        authenticated: state.authReducer.authenticated,
        unreadNotifications: state.notificationReducer.unread,
        isGameOn: state.gameReducer.isGameOn,
        data: state.gameReducer.data,
        loading: state.gameReducer.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        onGameContinued: (data) => {
            dispatch(onGameContinued(data));
        },

        onGameClosed: (data) => {
            dispatch(onGameClosed(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
