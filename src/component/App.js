/**
 * @file ei/component/App
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import Router from '../App';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.app = new Router({
            routes: this.props.routes
        });
    }

    getChildContext() {
        return {
            app: this.app
        };
    }

    render() {
        return (this.props.children);
    }

    componentWillUnmount() {
        this.app = null;
    }

}

let {PropTypes} = React;

App.propTypes = {
    routes: PropTypes.array.isRequired
};

App.childContextTypes = {
    app: PropTypes.object.isRequired
};

export default App;
