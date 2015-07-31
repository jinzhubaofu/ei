/**
 * @file todo dao
 * @author Leon(leon@outlook.com)
 */

var u = require('underscore');
var path = require('path');
var fs = require('fs');
var logger = require('ei-logger')('todo.server');
var Promise = require('es6-promise').Promise;

var db = path.resolve(__dirname, 'todo.json');

exports.getAll = function () {

    return new Promise(function (resolve, reject) {

        logger.silly('start to load data');

        fs.readFile(db, 'utf8', function (error, content) {

            if (error) {
                reject(error);
                return;
            }

            var data;

            try {
                data = JSON.parse(content);
            }
            catch (error) {

                logger.silly('data failed');

                reject(error);

                return;
            }

            logger.silly('load data succeed');

            resolve(data);

        });

    });

};

exports.get = function (id) {

    logger.silly('to get todo %s', id);

    return exports
        .getAll()
        .then(function (list) {

            var results = list.filter(function (record) {

                return id === record.id;

            });

            return results[0];

        });


};

exports.setFinished = function (id, isFinished) {

    logger.silly('update todo [%s] state', id);

    return exports.getAll().then(function (list) {

        list = list.map(function (record) {

            if (record.id === id) {
                return u.extend(
                    {},
                    record,
                    {
                        isFinished: isFinished
                    }
                );
            }

            return record;

        });

        return new Promise(function (resolve, reject) {

            fs.writeFile(db, JSON.stringify(list), function (err) {

                if (err) {
                    reject(err);
                    return;
                }

                resolve();

            });

        });

    });

};

exports.add = function (content) {

    logger.silly('to add new todo %s', content);

    return exports.getAll().then(function (list) {

        var timestamp = new Date().getTime();

        var record = {
            id: timestamp.toString(36),
            content: content,
            createTime: timestamp,
            updateTime: timestamp,
            isFinished: false
        };

        list.push(record);


        return new Promise(function (resolve, reject) {

            fs.writeFile(db, JSON.stringify(list), function (err) {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(record.id);

            });

        });

    });

};

exports.updateContent = function (id, content) {


    return exports.getAll().then(function (list) {

        return new Promise(function (resolve, reject) {

            var update;

            list = list.map(function (record) {

                if (record.id === id) {
                    record = update = u.extend(
                        {},
                        record,
                        {
                            content: content,
                            updateTime: new Date().getTime()
                        }
                    );
                }

                return record;

            });

            fs.writeFile(db, JSON.stringify(list), function (err) {

                setTimeout(function () {
                    err ? reject(err) : resolve(update);
                }, 3000);

            });

        });

    });

};
