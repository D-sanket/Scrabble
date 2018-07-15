import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import { onLoginBtnClick } from "../../actions/authActions";
import RedirectIfAuthenticated from './RedirectIfAuthenticated';

class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            email: "dahegaonkarsanket@gmail.com",
            password: "sanket"
        };
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onClick(){
        this.props.onClick(this.state);
    }

    render() {
        return (
            <div className="row">
                <RedirectIfAuthenticated/>
                <div className="col s12 m6 offset-m3">
                    <br/>
                    <div className="card">
                        <div className={"progress "+(this.props.isDisabled ? "" : "hide")}>
                            <div className="indeterminate"/>
                        </div>
                            <form className="card-content" onSubmit={event => { event.preventDefault() }}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input name="email" id="email" type="email" className={"validate "+(this.props.errors.email ? "invalid" : "")} value={this.state.email} onChange={this.onChange.bind(this)}/>
                                        <label htmlFor="email">Email</label>
                                        <span className="helper-text"
                                              data-error={this.props.errors.email}
                                              data-success=""/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input name="password" id="password" type="password" className={"validate "+(this.props.errors.password ? "invalid" : "")} value={this.state.password} onChange={this.onChange.bind(this)}/>
                                        <label htmlFor="password">Password</label>
                                        <span className="helper-text"
                                              data-error={this.props.errors.password}
                                              data-success=""/>
                                    </div>
                                </div>
                                <div className="row center-align">
                                    <div className="col s6 offset-s3">
                                        <input disabled={this.props.isDisabled} onClick={this.onClick.bind(this)} type="submit" className="btn blue" value="Login"/>
                                    </div>
                                </div>
                            </form>
                        <div className="card-action center-align">
                            Not registered yet ? <Link to="/register" className="blue-text">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return  {
        isDisabled: state.authReducer.isDisabled,
        errors: state.authReducer.errors
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        onClick: (data) => {
            dispatch(onLoginBtnClick(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
