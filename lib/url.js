/**
 * @file URL解析和生成的小工具
 * @author Leon(leon@outlook.com)
 * @module url
 * @requires underscore
 */

var u = require('underscore');

var parts = [{
    delimiter: '#',
    name: 'hash'
}, {
    delimiter: '?',
    name: 'search'
}, {
    // 这里用了path，而没有用pathname的原因是与express的req保持一致
    name: 'path',
    delimiter: '/'
}, {
    delimiter: ':',
    name: 'port'
}];

function parseQuery(search) {

    var query = {};

    if (!search) {
        return query;
    }

    return u.reduce(
        search.slice(1).split('&'),
        function (result, term) {

            var index = term.indexOf('=');

            var name;
            var value;

            // 每项里可能会N个=号哟，我们只取头一个
            if (~index) {
                name = term.slice(0, index);
                value = term.slice(index + 1);
            }
            // 没有等号，那么就全是name，value是空字符
            else {
                name = term;
                value = '';
            }

            // 如果有当前值
            var currentValue = result[name];

            switch (typeof currentValue) {
                case 'string':
                    result[name] = [currentValue, value];
                    break;
                case 'object':
                    result[name].push(value);
                    break;
                default:
                    result[name] = value;
            }

            return result;
        },
        query
    );

}

/**
 * 解析URL
 *
 * @notice 只能处理正确的url
 *
 * @param {string} url url
 * @return {Object}
 */
exports.parse = function (url) {

    var result = {};

    var protocalIndex = url.indexOf('://');

    if (~protocalIndex) {
        result.protocal = url.slice(0, protocalIndex);
        url = url.slice(protocalIndex + 3);
    }

    for (var i = 0, len = parts.length; i < len; ++i) {
        var part = parts[i];

        var index = url.indexOf(part.delimiter);

        if (~index) {
            result[part.name] = url.slice(index);
            url = url.slice(0, index);
        }

    }

    if (result.port) {
        result.port = +result.port.slice(1);
    }

    if (url) {
        result.host = url;
    }

    result.query = parseQuery(result.search);

    return result;

};

/**
 * 根据path和query生成URL片段
 *
 * @param {!string} path url path
 * @param {?Object} query search
 * @return {string}
 */
exports.makeUrl = function (path, query) {

    return ''
        + path
        + '?'
        + u.map(
            query,
            function (key, name) {
                return encodeURIComponent(name) + '=' + encodeURIComponent(key);
            }
        ).join('&');

};
