import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './Main/Main';

import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Register from "./Auth/Register";
import Header from './Header/Header';
import Challenges from './Main/Challenges';
import Games from './Main/Games';
import Game from './Game/Game';
import FourZeroFour from './FourZeroFour';
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
                            <Route path="/challenges" component={Challenges}/>
                            <Route path="/games" component={Games}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/logout" component={Logout}/>
                            <Route path="/game/:id" component={Game}/>
                            <Route component={FourZeroFour}/>
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
