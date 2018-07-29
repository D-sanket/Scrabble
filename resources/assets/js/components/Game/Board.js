import React from 'react';
import $ from 'jquery';
import Row from './BoardRow';
import { connect } from 'react-redux';
import { onGameResize } from "../../actions/gameActions";
import { store } from "../../core";

class Board extends React.Component{

    constructor(){
        super();

        let rows = [];
        let types = [
            [32, 0, 0, 21, 0, 0, 0, 32, 0, 0, 0, 21, 0, 0, 32],
            [0, 22, 0, 0, 0, 31, 0, 0, 0, 31, 0, 0, 0, 22, 0],
            [0, 0, 22, 0, 0, 0, 21, 0, 21, 0, 0, 0, 22, 0, 0],
            [21, 0, 0, 22, 0, 0, 0, 21, 0, 0, 0, 22, 0, 0, 21],
            [0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0],
            [0, 31, 0, 0, 0, 31, 0, 0, 0, 31, 0, 0, 0, 31, 0],
            [0, 0, 21, 0, 0, 0, 21, 0, 21, 0, 0, 0, 21, 0, 0],
            [32, 0, 0, 21, 0, 0, 0, 22, 0, 0, 0, 21, 0, 0, 32],
            [0, 0, 21, 0, 0, 0, 21, 0, 21, 0, 0, 0, 21, 0, 0],
            [0, 31, 0, 0, 0, 31, 0, 0, 0, 31, 0, 0, 0, 31, 0],
            [0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0],
            [21, 0, 0, 22, 0, 0, 0, 21, 0, 0, 0, 22, 0, 0, 21],
            [0, 0, 22, 0, 0, 0, 21, 0, 21, 0, 0, 0, 22, 0, 0],
            [0, 22, 0, 0, 0, 31, 0, 0, 0, 31, 0, 0, 0, 22, 0],
            [32, 0, 0, 21, 0, 0, 0, 32, 0, 0, 0, 21, 0, 0, 32]
        ];

        for(let i=0; i<15; i++){
            let tiles = [];
            for(let j=0; j<15; j++){
                tiles.push(types[i][j]);
            }
            rows.push(tiles);
        }

        this.rows = rows;

        $(window).on('resize', function () {
            store.dispatch(onGameResize());
        });
    }

    render(){
        return (
            <div style={{height: this.props.size+"px", width: this.props.size+"px"}} className="board teal lighten-3">
                { this.rows.map(function (row, i) { return <Row key={i} tiles={row}/> }) }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        size: state.gameReducer.size
    };
};

export default connect(mapStateToProps)(Board);
