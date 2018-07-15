import React from 'react';
import { Link } from 'react-router-dom';
import {onRegisterBtnClick} from "../../actions/authActions";
import {connect} from "react-redux";
import RedirectIfAuthenticated from './RedirectIfAuthenticated';

class Register extends React.Component {

    constructor(){
        super();
        this.state = {
            firstname: "Sanket",
            lastname: "Dahegaonkar",
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
                                    <input name="firstname" id="first_name" type="text" className={"validate "+(this.props.errors.firstname ? "invalid" : "")} onChange={this.onChange.bind(this)} value={this.state.firstname}/>
                                    <label htmlFor="first_name">First Name</label>
                                    <span className="helper-text"
                                          data-error={this.props.errors.firstname}
                                          data-success="">Must be of 3 to 30 chararcters in length</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input name="lastname" id="last_name" type="text" className={"validate "+(this.props.errors.lastname ? "invalid" : "")} onChange={this.onChange.bind(this)} value={this.state.lastname}/>
                                    <label htmlFor="last_name">Last Name</label>
                                    <span className="helper-text"
                                          data-error={this.props.errors.lastname}
                                          data-success="">Must be of 3 to 30 chararcters in length</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input name="email" id="email" type="email" className={"validate "+(this.props.errors.email ? "invalid" : "")} onChange={this.onChange.bind(this)} value={this.state.email}/>
                                    <label htmlFor="email">Email</label>
                                    <span className="helper-text"
                                          data-error={this.props.errors.email}
                                          data-success="">Must be a valid email</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input name="password" id="password" type="password" className={"validate "+(this.props.errors.password ? "invalid" : "")} onChange={this.onChange.bind(this)} value={this.state.password}/>
                                    <label htmlFor="password">Password</label>
                                    <span className="helper-text"
                                          data-error={this.props.errors.password}
                                          data-success="">Must be of 6 to 30 chararcters in length</span>
                                </div>
                            </div>
                            <div className="row center-align">
                                <div className="col s6 offset-s3">
                                    <input disabled={this.props.isDisabled} type="submit" className="btn blue" onClick={this.onClick.bind(this)} value="Register"/>
                                </div>
                            </div>
                        </form>
                        <div className="card-action center-align">
                            Already registered? <Link to="/login" className="blue-text">Login</Link>
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
            dispatch(onRegisterBtnClick(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

