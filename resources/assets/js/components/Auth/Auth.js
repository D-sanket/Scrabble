import React from 'react';
import { connect } from 'react-redux';
import AuthHeader from '../Header/AuthHeader';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

class Auth extends React.Component {
    render(){
        return (
            <div>
                <AuthHeader/>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route component={Login}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return  {

    }
};

export default connect(mapStateToProps)(Auth);

