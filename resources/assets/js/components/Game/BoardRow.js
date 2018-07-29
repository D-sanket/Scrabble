import React from 'react';
import Tile from "./Tile";
import { connect } from "react-redux";

class Row extends React.Component{

    render(){
        return (
            <div className="boardRow">
                { this.props.tiles.map(function (tile, i) { return <Tile key={i} type={tile}/>; }) }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        size: state.gameReducer.size
    };
};

export default connect(mapStateToProps)(Row);
