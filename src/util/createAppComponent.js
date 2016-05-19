/**
 * @file create app component
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const PropTypes = React.PropTypes;

function createAppComponent(App) {

    const AppComponent = React.createClass({

        getInitialState() {

            const {routes, router, app} = this.props;

            this.app = app || new App({routes, router});

            return {};
        },

        getChildContext() {

            const app = this.app;

            return {
                route(request) {
                    return app.route(request);
                },
                loadPage(pageModuleId) {
                    return app.loadPage(pageModuleId);
                }
            };

        },

        render() {
            return this.props.children;
        }

    });

    AppComponent.propTypes = {
        routes: PropTypes.arrayOf(
            PropTypes.shape({
                path: PropTypes.string.isRequired,
                page: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.func
                ]).isRequired
            })
        ),
        app: PropTypes.instanceOf(App),
        router: PropTypes.object
    };

    AppComponent.childContextTypes = {
        route: PropTypes.func,
        loadPage: PropTypes.func
    };


    return AppComponent;

}

module.exports = createAppComponent;
