import React from 'react';
import {connect} from "react-redux";

class Tile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            className: getClass(this.props.type),
            html: getHTML(this.props.type)
        };
    }

    onClick(){
        this.setState({
            className: "filled",
            html: 'x'
        });
    }

    render(){
        return (
            <div className={"tile noselect "+this.state.className} style={{height: this.props.size+"px", width: this.props.size}} onClick={this.onClick.bind(this)}>
                {this.state.html}
            </div>
        )
    }
}

function getClass(type) {
    switch (type){
        case 0:
            return "null";
        case 21:
            return "l2";
        case 22:
            return "w2";
        case 31:
            return "l3";
        case 32:
            return "w3";
    }
}



function getHTML(type) {
    switch (type){
        case 0:
            return "";
        case 21:
            return "2L";
        case 22:
            return "2W";
        case 31:
            return "3L";
        case 32:
            return "3W";
    }
}


const mapStateToProps = (state) => {
    return {
        size: state.gameReducer.size/15
    };
};

export default connect(mapStateToProps)(Tile);

