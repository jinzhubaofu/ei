define('ei/component/ConextProvider', [
    'require',
    'exports',
    'module',
    'react'
], function (require, exports, module) {
    var React = require('react');
    var ContextProvider = React.createClass({
        childContextTypes: { ei: React.PropTypes.object.isRequired },
        propTypes: { ei: React.PropTypes.object.isRequired },
        getChildContext: function () {
            return { ei: this.props.ei };
        },
        render: function () {
            var ei = this.props.ei;
            return this.props.children(ei.store, ei.dispatch);
        }
    });
    module.exports = ContextProvider;
});