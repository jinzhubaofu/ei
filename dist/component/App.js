define('ei/component/App', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../App'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Router = require('../App');
    var App = function (_React$Component) {
        babelHelpers.inherits(App, _React$Component);
        function App(props) {
            babelHelpers.classCallCheck(this, App);
            babelHelpers.get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);
            this.app = new Router({ routes: this.props.routes });
        }
        babelHelpers.createClass(App, [
            {
                key: 'getChildContext',
                value: function getChildContext() {
                    return { app: this.app };
                }
            },
            {
                key: 'render',
                value: function render() {
                    return this.props.children;
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.app = null;
                }
            }
        ]);
        return App;
    }(React.Component);
    var PropTypes = React.PropTypes;
    App.propTypes = { routes: PropTypes.array.isRequired };
    App.childContextTypes = { app: PropTypes.object.isRequired };
    module.exports = App;
});