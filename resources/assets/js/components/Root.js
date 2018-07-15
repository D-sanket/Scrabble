import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './Main/Main';

import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Register from "./Auth/Register";
import Header from './Header/Header';
import { store }  from '../core';

class Root extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <div>
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={Main}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/logout" component={Logout}/>
                        </Switch>
                    </div>
                </Provider>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
