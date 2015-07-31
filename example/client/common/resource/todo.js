/**
 * @file test resource
 * @author Leon(leon@outlook.com)
 */

var axios = require('axios');

exports.getAll = function () {

    return axios({

        url: '/list'

    });

};

exports.get = function (id) {

    return axios.get('/detail', {

        params: {
            id: id
        }

    });

};

exports.setFinished = function (id, isFinished) {

    return axios.post('/setFinished', {
        id: id,
        isFinished: isFinished
    });

};

exports.add = function (content) {

    return axios.post('/add', {
        content: content
    });

};

exports.updateContent = function (id, content) {

    return axios.post('/updateContent', {
        id: id,
        content: content
    }).then(function (response) {
        return response.todo;
    });

};
