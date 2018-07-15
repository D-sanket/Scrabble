import React from 'react';
import $ from "jquery";
import {getToken} from "../../core";

export default class AcceptDeclineBtns extends React.Component{
    constructor(){
        super();
        this.state = {
            disabled: false,
            status: 0
        };
    }

    onAcceptClick(){
        $("a[id=acceptbtn"+this.props.user.id+"]").parent().addClass("blue-grey lighten-5");
        this.setState({
            disabled: true,
            status: 1
        });
        const self = this;

        axios.post('/api/acceptchallenge/'+this.props.user.id, {token: getToken()})
            .then(function (response) {
                self.setState({
                    disabled: true,
                    status: 2
                });
                M.toast({html: "Challenge accepted...visit the games menu now!!"});
            })
            .catch(function (error) {
                console.error(error);
                M.toast({html: "Something went wrong!"});
                self.setState({
                    disabled: false,
                    status: 0
                });
            });
    }

    onDeclineClick(){
        $("a[id=declinebtn"+this.props.user.id+"]").parent().addClass("blue-grey lighten-5");
        this.setState({
            disabled: true,
            status: 1
        });
        const self = this;

        axios.post('/api/declinechallenge/'+this.props.user.id, {token: getToken()})
            .then(function (response) {
                self.setState({
                    disabled: true,
                    status: 2
                });
                M.toast({html: "Challenge declined!"});
            })
            .catch(function (error) {
                console.error(error);
                M.toast({html: "Something went wrong!"});
                self.setState({
                    disabled: false,
                    status: 0
                });
            });
    }

    render(){
        return (
            <div className="secondary-content">
                <a id={"acceptbtn"+this.props.user.id} className="" onClick={this.onAcceptClick.bind(this)}>
                    {this.state.status === 0 ? (
                        <i className="material-icons green-text">double_check</i>
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
                <a id={"declinebtn"+this.props.user.id} className="" onClick={this.onDeclineClick.bind(this)}>
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
