import {getToken, store} from "../core";

import { defaultAction } from '../actions/userListActions';
import { onLogout } from "../actions/authActions";
import $ from 'jquery';

const defaultUserListState = {
    unchallengedUsers: [],
    challengedUsers: [],
    challengers: [],
    loading: true,
};

const queue = [];
let isRunning = false;

export default (state = defaultUserListState, action = {}) => {

    switch(action.type){
        case "DEFAULT_LIST":
            state = action.payload;
            break;

        case "FETCH_USERS":
            fetchUsers(action.payload, state);
            break;
    }

    return state;
}

function fetchUsers(data, state) {
    if(isRunning){
        queue.push({
            data: data,
            state: state
        });
        return;
    }

    isRunning = true;

    axios.post('/api/users/'+data, { token: getToken() })
        .then(function (response) {
            //console.log(response);
            const users = [];
            $.each(response.data, function (idx) {
                users.push(response.data[idx]);
            });
            switch (data){
                case "challengers":
                    state = {
                        ...state,
                        challengers: users,
                        loading: false
                    };
                    break;
                case "sentchallenges":
                    state = {
                        ...state,
                        challengedUsers: users,
                        loading: false
                    };
                    break;
                case "unchallenged":
                    state = {
                        ...state,
                        unchallengedUsers: users,
                        loading: false
                    };
                    break;

            }
            store.dispatch(defaultAction(state));
            isRunning = false;
            runQueued();
        })
        .catch(function (error) {
            console.error(error);
            if(error.response.status === 401){
                store.dispatch(onLogout(store.getState().authReducer));
            }
            isRunning = false;
            runQueued();
        });
}

function runQueued() {
    if(queue.length > 0){
        const temp = queue[0];
        queue.splice(0, 1);
        fetchUsers(temp.data, store.getState().userListReducer);
    }
}
