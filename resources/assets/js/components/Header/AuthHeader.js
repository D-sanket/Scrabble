import React from 'react';
import { NavLink } from 'react-router-dom';
export default class AuthHeader extends React.Component {

    render() {
        return (
            <div className="row blue card z-depth-2">
                <nav className="nav-extended transparent col s12 m6 offset-m3">
                    <div className="nav-wrapper">
                        <NavLink activeStyle={{color: 'white'}} to="/" className="brand-logo left">Scrabble</NavLink>
                    </div>
                    <div className="nav-content">
                        <ul className="tabs tabs-transparent">
                            <li className="tab"><NavLink activeStyle={{color: 'white'}} to="/login">Login</NavLink></li>
                            <li className="tab"><NavLink activeStyle={{color: 'white'}} to="/register">Register</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    };
}
