define('ei/component/ConextProvider', [
    'exports',
    '../babelHelpers',
    'react'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var ContextProvider = React.createClass({
        displayName: 'ContextProvider',
        childContextTypes: { ei: React.PropTypes.object.isRequired },
        propTypes: { ei: React.PropTypes.object.isRequired },
        getChildContext: function getChildContext() {
            return { ei: this.props.ei };
        },
        render: function render() {
            var ei = this.props.ei;
            return this.props.children(ei.store, ei.dispatch);
        }
    });
    module.exports = ContextProvider;
});