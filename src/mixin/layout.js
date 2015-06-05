define(require, exports, module) {
/**
 * @file ei/mixin/layout
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var React = require('react');
var Layout = require('./Layout');

module.exports = {

    propTypes: {
        layout: React.PropTypes.object
    },

    randerLayout: function (html) {
        return Layout.render(
            this.props.layout,
            {
                app: html
            }
        );
    }

};

});