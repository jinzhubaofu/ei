define('ei/url', [
    'exports',
    './babelHelpers',
    'underscore'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var u = require('underscore');
    var parts = [
        {
            delimiter: '#',
            name: 'hash'
        },
        {
            delimiter: '?',
            name: 'search'
        },
        {
            name: 'path',
            delimiter: '/'
        },
        {
            delimiter: ':',
            name: 'port'
        }
    ];
    function parseQuery(search) {
        var query = {};
        if (!search) {
            return query;
        }
        return u.reduce(search.slice(1).split('&'), function (result, term) {
            var index = term.indexOf('=');
            var name;
            var value;
            if (~index) {
                name = term.slice(0, index);
                value = term.slice(index + 1);
            } else {
                name = term;
                value = '';
            }
            var currentValue = result[name];
            switch (typeof currentValue) {
            case 'string':
                result[name] = [
                    currentValue,
                    value
                ];
                break;
            case 'object':
                result[name].push(value);
                break;
            default:
                result[name] = value;
            }
            return result;
        }, query);
    }
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
    exports.makeUrl = function (path, query) {
        return '' + path + '?' + u.map(query, function (key, name) {
            return encodeURIComponent(name) + '=' + encodeURIComponent(key);
        }).join('&');
    };
});