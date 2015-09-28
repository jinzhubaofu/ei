define('ei/util/connect', [
    'require',
    'exports',
    'module',
    'react',
    'underscore',
    '../component/ContextConnector',
    './bindActions',
    './bindSelectors'
], function (require, exports, module) {
    var React = require('react');
    var u = require('underscore');
    var ContextConnector = require('../component/ContextConnector');
    var bindActions = require('./bindActions');
    var bindSelectors = require('./bindSelectors');
    function connect(Component, selector, actions) {
        var ContextFixer = React.createClass({
            displayName: 'ContextFixer',
            select: bindSelectors(selector),
            render: function () {
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