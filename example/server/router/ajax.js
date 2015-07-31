/**
 * @file ajax
 * @author Leon(leon@outlook.com)
 */

var express = require('express');

var router = new express.Router();

var todo = require('../common/resource/todo.js');

router.post('/setFinished', function (req, res) {

    if (!req.xhr) {
        res.status(403);
        return;
    }

    var data = req.body;

    todo
        .setFinished(data.id, data.isFinished)
        .then(function (isFinished) {

            res.status(200).send({
                status: 0,
                data: {
                    isFinished: isFinished
                }
            });

        }, function (error) {

            var status = error.status || 500;

            res.status(status).send({
                status: status,
                statusInfo: error.message || 'server error'
            });

        });

});

router.post('/add', function (req, res) {

    if (!req.xhr) {
        res.status(403);
        return;
    }

    var data = req.body;

    if (!data.content) {
        res.status(500).send({
            status: 500,
            statusInfo: 'need content'
        });
        return;
    }

    todo
        .add(data.content)
        .then(function (id) {

            res.status(200).send({
                id: id
            });

        }, function (error) {

            var status = error.status || 500;

            res.status(status).send({
                status: status,
                statusInfo: error.message || 'server error'
            });

        });

});

router.post('/updateContent', function (req, res) {

    if (!req.xhr) {
        res.status(403);
        return;
    }

    var data = req.body;

    if (!data.content || !data.id) {
        res.status(500).send({
            status: 500,
            statusInfo: 'need id and content'
        });
        return;
    }

    todo
        .updateContent(data.id, data.content)
        .then(function (data) {

            console.log(data);

            res.status(200).send({
                status: 0,
                todo: data
            });

        }, function (error) {

            var status = error.status || 500;

            res.status(status).send({
                status: status,
                statusInfo: error.message || 'server error'
            });

        });

});

module.exports = router;
