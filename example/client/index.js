/**
 * @file client index
 * @author Leon(leon@outlook.com)
 */

var React = require('react');
var axios = require('axios');
var App = require('../../../lib/App');

var Resource = require('../../../lib/resource');
var todoResource = require('./common/resource/todo');

Resource.register('todo', todoResource);

var app = new App({

    main: 'app',

    routes: require('../iso/routes')

});

axios.interceptors.request.use(function (config) {

    var headers = config.headers = config.headers || {};

    headers['X-Requested-With'] = 'XMLHttpRequest';

    return config;

});

axios.interceptors.response.use(function (response) {
    return response.data;
});

exports.bootstrap = function (data) {

    React.initializeTouchEvents(true);

    app.bootstrap(data);

};
