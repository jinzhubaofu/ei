/**
 * @file biz
 * @author Leon(leon@outlook.com)
 */

var express = require('express');
var path = require('path');
var router = new express.Router();

var App = require('../../../../lib/App');

var logger = require('ei-logger')('biz');

var app = new App({

    main: 'app',

    basePath: path.join(__dirname, '../..'),

    routes: require('../../iso/routes')

});

router.use(function (req, res, next) {

    logger.info(req.path);

    app
        .execute(req)
        .then(function (result) {

            var data = result.initialState;

            if (req.xhr) {
                res.status(200).send(data);
                return;
            }

            res.render(
                result.route.template,
                {
                    feRoot: 'http://x.baidu.com:8889',
                    content: result.page.renderToString(),
                    pack: data
                }
            );

        })
        ['catch'](function (error) {

            if (error.status === 404) {
                next();
                return;
            }

            res.status(error.status || 500).send('shit' + (error && error.stack)).end();

        });

});

module.exports = router;


