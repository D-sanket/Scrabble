import React from 'react';
import RedirectIfNotAuthenticated from '../Auth/RedirectIfNotAuthenticated';

import ReceivedChallenges from "./ReceivedChallenges";
import SentChallenges from "./SentChallenges";


export default class Challenges extends React.Component {
    render() {
        return (
            <div className="row">
                <RedirectIfNotAuthenticated />
                <ReceivedChallenges/>
                <SentChallenges />
            </div>
        );
    }

}
