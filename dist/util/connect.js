define('ei/util/connect', [
    'exports',
    '../babelHelpers',
    'react',
    'underscore',
    '../component/ContextConnector',
    './bindActions',
    './bindSelectors'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var u = require('underscore');
    var ContextConnector = require('../component/ContextConnector');
    var bindActions = require('./bindActions');
    var bindSelectors = require('./bindSelectors');
    function connect(Component, selector, actions) {
        var ContextFixer = React.createClass({
            displayName: 'ContextFixer',
            select: bindSelectors(selector),
            render: function render() {
                var props = this.props;
                return React.createElement(ContextConnector, { select: this.select }, function (state, dispatch) {
                    return React.createElement(Component, u.extendOwn({}, state, props, actions ? bindActions(dispatch, actions) : null));
                });
            }
        });
        return ContextFixer;
    }
    module.exports = connect;
});