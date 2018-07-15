import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

export const store = createStore(rootReducer);

export function getToken(){
    const token = localStorage.getItem('token');
    return  !!token ? token : false;
}

