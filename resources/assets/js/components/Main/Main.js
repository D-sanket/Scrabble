import React from 'react';
import { connect } from 'react-redux';
import RedirectIfNotAuthenticated from '../Auth/RedirectIfNotAuthenticated';

class Main extends React.Component {
    render() {
        return (
            <div>
                <RedirectIfNotAuthenticated/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return  {

    }
};

export default connect(mapStateToProps)(Main);

