define('ei/component/App', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../App'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _App = require('../App');
    var _App2 = babelHelpers.interopRequireDefault(_App);
    var App = function (_React$Component) {
        babelHelpers.inherits(App, _React$Component);
        function App(props) {
            babelHelpers.classCallCheck(this, App);
            babelHelpers.get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);
            this.app = new _App2['default']({ routes: this.props.routes });
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
    }(_react2['default'].Component);
    var PropTypes = _react2['default'].PropTypes;
    App.propTypes = { routes: PropTypes.array.isRequired };
    App.childContextTypes = { app: PropTypes.object.isRequired };
    exports['default'] = App;
    module.exports = exports['default'];
});