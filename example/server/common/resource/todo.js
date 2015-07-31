/**
 * @file todo dao
 * @author Leon(leon@outlook.com)
 */

var dao = require('../dao/todo');

exports.getAll = function () {

    return dao.getAll();

};

exports.get = function (id) {

    return dao.get(id);

};

exports.setFinished = function (id, isFinished) {

    return dao.setFinished(id, isFinished);

};

exports.add = function (content) {

    return dao.add(content);

};

exports.updateContent = function (id, content) {

    return dao.updateContent(id, content);

};
