import React from 'react';
import { connect } from 'react-redux';
import {onUsersFetch} from "../../actions/userListActions";
import ChallengeBtn from "../ActionButtons/ChallengeBtn";


class UnchallengedUsers extends React.Component {

    componentWillMount(){
        this.props.fetchUsers('unchallenged');
    }

    render() {
        return (
            <div className="col s12 m6 offset-m3">
                <br/>

                <ul className="collection with-header card">

                    <li className="collection-header"><h5>All users</h5></li>

                    <div className={"progress "+(this.props.loading ? "" : "hide")}>
                        <div className="indeterminate"/>
                    </div>

                    {this.props.users.length === 0 ? (
                        <li className="collection-item">No users to challenge!</li>
                    ): ""}

                    {this.props.users.map((user, i) => (
                        <li key={i} className="collection-item avatar">
                            <i className="material-icons circle">person</i>
                            <span className="title">{user.firstname} {user.lastname}</span>
                            <ChallengeBtn user={user}/>
                        </li>
                    ))}

                </ul>

            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return  {
        users: state.userListReducer.unchallengedUsers,
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

export default connect(mapStateToProps, mapDispatchToProps)(UnchallengedUsers);

