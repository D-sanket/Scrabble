import React from 'react';
import { NavLink } from 'react-router-dom';
export default class MainHeader extends React.Component {

    render() {
        return (
            <div className="row blue card z-depth-2">
                <nav className="nav-extended transparent col s12 m6 offset-m3">
                    <div className="nav-wrapper">
                        <NavLink activeStyle={{color: 'white'}} to="/" className="brand-logo left">Scrabble</NavLink>
                        <ul id="nav-mobile" className="right">
                            <li><NavLink to="/logout"><i className="material-icons">power_settings_new</i> </NavLink></li>
                        </ul>
                    </div>
                    <div className="nav-content">
                        <ul className="tabs tabs-transparent">
                            <li className="tab"><NavLink activeStyle={{color: 'white'}} to="/">Home</NavLink></li>
                            <li className="tab">
                                <NavLink activeStyle={{color: 'white'}} to="/challenges">
                                    Challenges
                                </NavLink>
                            </li>
                            <li className="tab"><NavLink activeStyle={{color: 'white'}} to="/games">Games</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    };
}
