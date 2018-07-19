import React from 'react';
import { connect } from 'react-redux';
import {onUsersFetch} from "../../actions/userListActions";
import ContinueLeaveButton from "../ActionButtons/ContinueLeaveButton";
import RedirectIfNotAuthenticated from '../Auth/RedirectIfNotAuthenticated';

class Games extends React.Component {

    componentWillMount(){
        this.props.fetchUsers('games');
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <RedirectIfNotAuthenticated/>
                    <br/>

                    <ul className="collection with-header card">

                        <li className="collection-header"><h5>Ongoing games</h5></li>

                        <div className={"progress "+(this.props.loading ? "" : "hide")}>
                            <div className="indeterminate"/>
                        </div>

                        {this.props.users.length === 0 ? (
                            <li className="collection-item">No games yet!</li>
                        ): ""}

                        {this.props.users.map((user, i) => (
                            <li key={i} className="collection-item avatar">
                                <i className="material-icons circle">person</i>
                                <span className="title">{user.firstname} {user.lastname}</span>
                                <ContinueLeaveButton user={user} />
                            </li>
                        ))}

                    </ul>

                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return  {
        users: state.userListReducer.games,
        loading: state.userListReducer.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        fetchUsers: (data) => {
            dispatch(onUsersFetch(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);

