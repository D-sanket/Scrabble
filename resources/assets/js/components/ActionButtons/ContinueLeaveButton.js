import React from 'react';
import $ from "jquery";
import {getToken} from "../../core";
import { onGameContinued} from "../../actions/gameActions";
import { store } from "../../core";
import { Redirect } from 'react-router-dom';

export default class ContinueLeaveButton extends React.Component{
    constructor(){
        super();
        this.state = {
            disabled: false,
            status: 0
        };
    }

    onContinueClick(){
        if(this.state.disabled)
            return;
        $("a[id=continuebtn"+this.props.user.id+"]").parent().parent().addClass("blue-grey lighten-5");
        this.setState({
            disabled: true,
            status: 2
        });
    }

    onLeaveClick(){
        if(this.state.disabled)
            return;
        $("a[id=leavebtn"+this.props.user.id+"]").parent().parent().addClass("blue-grey lighten-5");
        this.setState({
            disabled: true,
            status: 1
        });
        const self = this;

        axios.post('/api/game/leave/'+this.props.user.id, {token: getToken()})
            .then(function (response) {
                self.setState({
                    disabled: true,
                    status: 2
                });
                M.toast({html: response.data.message});
            })
            .catch(function (error) {
                console.error(error);
                M.toast({html: "Something went wrong! 1"});
                self.setState({
                    disabled: false,
                    status: 0
                });
                $("a[id=leavebtn"+self.props.user.id+"]").parent().parent().removeClass("blue-grey lighten-5");
            });
    }

    render(){
        return (
            <div className="secondary-content">
                <a id={"continuebtn"+this.props.user.id} className="" onClick={this.onContinueClick.bind(this)}>
                    {this.state.status === 0 ? (
                        <i className="material-icons green-text">play_arrow</i>
                    ) : (
                        this.state.status === 1 ? (
                            ""
                        ) : (
                            <Redirect to={"/game/"+this.props.user.id}/>
                        )
                    )}
                </a>
                &nbsp;
                &nbsp;
                <a id={"leavebtn"+this.props.user.id} className="" onClick={this.onLeaveClick.bind(this)}>
                    {this.state.status === 0 ? (
                        <i className="material-icons red-text">close</i>
                    ) : (
                        this.state.status === 1 ? (
                            <div className="preloader-wrapper small active">
                                <div className="spinner-layer spinner-blue-only">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <i className="material-icons green-text">done</i>
                        )
                    )}
                </a>
            </div>
        );
    }
}
