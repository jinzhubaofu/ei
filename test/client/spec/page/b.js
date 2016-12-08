/**
 * @file a test page who will throw error
 * @author Leon(leon@outlook.com)
 */

var Page = require('../../../../src/Page');

var React = require('react');

var TestPage = Page.extend({

    view: React.createClass({

        render: function () {
            throw new Error('hehe');
        }

    }),

    reducer: function (store) {

        throw new Error('cannot reduce');

        return store;
    }

});

TestPage.type = 'test';

module.exports = TestPage;
