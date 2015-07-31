/**
 * @file TodoPage
 * @author Leon(leon@outlook.com)
 */

var App = require('./component/Index.jsx');

var Page = require('../../../../lib/Page');

var Resource = require('../../../../lib/resource');

var TodoPage = Page.extend({

    view: App,

    reducer: require('./reducer/list'),

    getInitialState: function (request) {
        return Resource.get('todo').getAll();
    }

});

module.exports = TodoPage;
