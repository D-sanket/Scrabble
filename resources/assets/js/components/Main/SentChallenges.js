import React from 'react';
import { connect } from 'react-redux';
import {onUsersFetch} from "../../actions/userListActions";
import CancelBtn from '../ActionButtons/CancelBtn';


class SentChallenges extends React.Component {

    componentWillMount(){
        this.props.fetchUsers('sentchallenges');
    }

    render() {
        return (
            <div className="col s12 m6 offset-m3">
                <br/>
                <ul className="collection with-header card">
                    <li className="collection-header"><h5>Sent Challenges</h5></li>
                    <div className={"progress "+(this.props.loading ? "" : "hide")}>
                        <div className="indeterminate"/>
                    </div>
                    {this.props.susers.length === 0 ? (
                        <li className="collection-item">No challenges!</li>
                    ): ""}

                    {this.props.susers.map((user, i) => (
                        <li key={i} className="collection-item avatar">
                            <i className="material-icons circle">person</i>
                            <span className="title">{user.firstname} {user.lastname}</span>
                            <CancelBtn user={user}/>
                        </li>
                    ))}

                </ul>

            </div>

        );
    }

}

const mapStateToProps = (state) => {
    return  {
        susers: state.userListReducer.challengedUsers,
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

export default connect(mapStateToProps, mapDispatchToProps)(SentChallenges);

