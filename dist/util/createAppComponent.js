define('ei/util/createAppComponent', [
    'require',
    'exports',
    'module',
    'react'
], function (require, exports, module) {
    var React = require('react');
    var PropTypes = React.PropTypes;
    function createAppComponent(App) {
        var AppComponent = React.createClass({
            displayName: 'AppComponent',
            getInitialState: function getInitialState() {
                var _props = this.props;
                var routes = _props.routes;
                var router = _props.router;
                var app = _props.app;
                this.app = app || new App({
                    routes: routes,
                    router: router
                });
                return {};
            },
            getChildContext: function getChildContext() {
                var app = this.app;
                return {
                    route: function route(request) {
                        return app.route(request);
                    },
                    loadPage: function loadPage(pageModuleId) {
                        return app.loadPage(pageModuleId);
                    }
                };
            },
            render: function render() {
                return this.props.children;
            }
        });
        AppComponent.propTypes = {
            routes: PropTypes.arrayOf(PropTypes.shape({
                path: PropTypes.string.isRequired,
                page: PropTypes.string.isRequired
            })),
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
});