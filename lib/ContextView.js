/**
 * @file React Component View with Context
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var React = require('react');

var mixin = require('./mixin');

var ContextView = React.createClass({

    displayName: 'ContextView',

    mixins: [mixin.view],

    render: function () {
        return React.createElement(
            'div',
            null,
            this.props.children
        );
    }

});

console.dir(ContextView.prototype);

module.exports = ContextView;
