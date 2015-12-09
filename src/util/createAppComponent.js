/**
 * @file create app component
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const {PropTypes} = React;

function createAppComponent(App) {

    const AppComponent = React.createClass({

        getInitialState() {

            const {routes} = this.props;

            this.app = new App({
                routes
            });

            return {};
        },

        getChildContext() {

            return {
                route(request) {
                    return this.app.route(request);
                }
            };

        },

        componentDidMount() {
            const {jobRunner, jobQueue} = this;
            jobRunner.run(jobQueue);
        },

        render() {
            return this.props.children;
        }


    });

    AppComponent.propTypes = {
        routes: PropTypes.arrayOf(
            PropTypes.shape({
                path: PropTypes.string.isRequired,
                page: PropTypes.string.isRequired
            })
        ).isRequired
    };

    AppComponent.childContextTypes = {
        addJob: PropTypes.func,
        getParentJob: PropTypes.func
    };


    return AppComponent;

}

module.exports = createAppComponent;
