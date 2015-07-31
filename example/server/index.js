/**
 * @file index
 * @author Leon(leon@outlook.com)
 */

var fs = require('fs');
var transform = require('react-tools').transform;
var express = require('express');
var swig = require('swig');
var u = require('underscore');

var eiLogger = require('ei-logger');


var ei = eiLogger('ei');

require('../../../lib/events').on('*', function () {

    var messages = [this.getCurrentEvent()]
        .concat(u.map(
            arguments,
            function (arg) {
                return JSON.stringify(arg);
            }
        ));

    ei.silly.apply(ei, messages);

});

require.extensions['.jsx'] = function (module, filename) {
    var source = fs.readFileSync(filename, 'utf8');
    var code = transform(source);
    module._compile(code);
};

var Resource = require('../../../lib/resource');

var todoResource = require('./common/resource/todo');

Resource.register('todo', todoResource);

var bodyParser = require('body-parser');

express()
    .engine('swig', swig.renderFile)
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .set('view engine', 'swig')
    .set('views', __dirname)
    .set('view cache', false)
    .use(require('./router/ajax'))
    .use(require('./router/biz'))
    .listen(8888, function () {
        console.log('server listen http://localhost:8888');
    });

process.on('uncaughtException', function (e) {
    console.error(e);
});
