import authReducer from './authReducer';
import userListReducer from './userListReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    authReducer,
    userListReducer
});
