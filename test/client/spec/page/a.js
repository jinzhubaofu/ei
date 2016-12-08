/**
 * @file a test page
 * @author Leon(leon@outlook.com)
 */

var Page = require('../../../../src/Page');

var React = require('react');

var TestPage = Page.extend({

    view: React.createClass({

        render: function () {
            return React.createElement('div');
        }

    }),

    reducer: function (store) {
        return store;
    }

});

TestPage.type = 'test';


module.exports = TestPage;
