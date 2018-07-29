import {getToken, store} from "../core";
import M from 'materialize-css';
import { defaultAction } from '../actions/authActions';

const defaultAuthState = {
    authenticated: !!(getToken()),
    isDisabled: false,
    errors: {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    }
};

export default (state = defaultAuthState, action = {}) => {

    switch(action.type){
        case "DEFAULT":
            //console.log(action.payload);
            state = action.payload;
            break;

        case "ON_LOGOUT":
            localStorage.removeItem('token');
            state = {
                ...state,
                authenticated: false
            };
            break;

        case "ON_LOGIN_BTN_CLICK":
            state = {
                ...state,
                isDisabled: true
            };
            login(action.payload, state);
            break;

        case "ON_REGISTER_BTN_CLICK":
            state = {
                ...state,
                isDisabled: true
            };

            register(action.payload, state);
            break;
    }

    return state;
}

function register(data, state) {
    axios.post('/api/auth/register', data)
        .then(function (response) {

            M.toast({html: response.data.message});
            store.dispatch(defaultAction(defaultAuthState));
        })
        .catch(function (error) {

            if(error.response.status === 422){
                const err = error.response.data.errors;

                state = {
                    ...state,
                    errors: {
                        ...state.errors,
                        firstname: err.firstname,
                        lastname: err.lastname,
                        email: err.email,
                        password: err.password
                    },
                    isDisabled: false
                };


                console.log(state);
                store.dispatch(defaultAction(state));
            }
            else{
                console.error(error);
            }
        });
}

function login(data, state) {
    axios.post('/api/auth/login', data)
        .then(function (response) {
            if(response.data.error){
                M.toast({html: response.data.error});
                state = {
                    ...state,
                    isDisabled: false,
                    authenticated: false
                };
                store.dispatch(defaultAction(state));
            }
            else{
                localStorage.setItem('token', response.data.token);
                state = {
                    ...defaultAuthState,
                    isDisabled: false,
                    authenticated: true
                };
                store.dispatch(defaultAction(state));
            }
        })
        .catch(function (error) {

            if(error.response.status === 422){
                const err = error.response.data.errors;

                state = {
                    ...state,
                    errors: {
                        ...state.errors,
                        email: err.email,
                        password: err.password
                    },
                    isDisabled: false
                };

                store.dispatch(defaultAction(state));
            }
            else{
                console.error(error);
            }
        });
}
