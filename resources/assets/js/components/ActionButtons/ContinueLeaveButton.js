import React from 'react';
import $ from "jquery";
import {getToken} from "../../core";

export default class ContinueLeaveButton extends React.Component{
    constructor(){
        super();
        this.state = {
            disabled: false,
            status: 0
        };
    }

    onContinueClick(){
        $("a[id=continuebtn"+this.props.user.id+"]").parent().parent().addClass("blue-grey lighten-5");
        this.setState({
            disabled: true,
            status: 1
        });
        const self = this;

        axios.post('/api/game/continue/'+this.props.user.id, {token: getToken()})
            .then(function (response) {
                self.setState({
                    disabled: true,
                    status: 2
                });
                console.log(response.data[0]);
            })
            .catch(function (error) {
                console.error(error);
                M.toast({html: "Something went wrong!"});
                self.setState({
                    disabled: false,
                    status: 0
                });
                $("a[id=continuebtn"+self.props.user.id+"]").parent().parent().removeClass("blue-grey lighten-5");
            });
    }

    onLeaveClick(){
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
                            ""
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
