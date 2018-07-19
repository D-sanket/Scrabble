import authReducer from './authReducer';
import userListReducer from './userListReducer';
import notificationReducer from './notificationReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    authReducer,
    userListReducer,
    notificationReducer
});
