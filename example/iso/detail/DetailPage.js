/**
 * @file TodoPage
 * @author Leon(leon@outlook.com)
 */


var Page = require('../../../../../lib/Page');

var TodoPage = Page.extend({

    view: require('./component/Index.jsx'),

    reducer: require('./reducer/todo')

});

module.exports = TodoPage;


