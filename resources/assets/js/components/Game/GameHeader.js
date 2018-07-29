import React from 'react';
import { connect } from 'react-redux';

class GameHeader extends React.Component{

    render(){
        return (
            <div className="gameHeaderContainer z-depth-1">
                <div className="player1">
                    <div className="name">
                        {this.props.data.player1.firstname+" "+this.props.data.player1.lastname}
                    </div>
                    <div className="score">
                        {this.props.data.game.score1}
                    </div>
                </div>
                <div className="player2">
                    <div className="name">
                        {this.props.data.player2.firstname+" "+this.props.data.player2.lastname}
                    </div>
                    <div className="score">
                        {this.props.data.game.score2}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(GameHeader);
