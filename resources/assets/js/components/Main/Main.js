import React from 'react';
import RedirectIfNotAuthenticated from '../Auth/RedirectIfNotAuthenticated';
import UnchallengedUsers from "./UnchallengedUsers";


export default class Main extends React.Component {
    render() {
        return (
            <div className="row">
                <RedirectIfNotAuthenticated />
                <UnchallengedUsers />
            </div>
        );
    }

}

