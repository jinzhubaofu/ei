define('ei/component/ContextProvider', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var ContextProvider = function (_React$Component) {
        babelHelpers.inherits(ContextProvider, _React$Component);
        function ContextProvider() {
            babelHelpers.classCallCheck(this, ContextProvider);
            babelHelpers.get(Object.getPrototypeOf(ContextProvider.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(ContextProvider, [
            {
                key: 'getChildContext',
                value: function getChildContext() {
                    return { ei: this.props.ei };
                }
            },
            {
                key: 'render',
                value: function render() {
                    return this.props.children;
                }
            }
        ]);
        return ContextProvider;
    }(React.Component);
    var PropTypes = React.PropTypes;
    ContextProvider.childContextTypes = { ei: PropTypes.object.isRequired };
    ContextProvider.propTypes = { ei: React.PropTypes.object.isRequired };
    module.exports = ContextProvider;
});