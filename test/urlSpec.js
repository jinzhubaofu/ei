/**
 * @file url spec
 * @author Leon(leon@outlook.com)
 */

var u = require('underscore');
var url = require('../lib/url');

describe('url', function () {

    it('parse simple', function () {

        var str = 'http://www.baidu.com';

        var result = url.parse(str);

        expect(result.search).toBe(void 0);

    });

    it('parse query empty value', function () {

        var str = 'http://www.baidu.com?a';

        var result = url.parse(str);

        expect(result.query.a).toBe('');

    });

    it('parse query array', function () {

        var str = 'http://www.baidu.com?a=1&a=2&a=3';

        var result = url.parse(str);

        expect(u.isArray(result.query.a)).toBe(true);
        expect(result.query.a).toEqual(['1', '2', '3']);

    });

    it('parse', function () {

        var str = 'file:///Users/leon/code/github/ei/coverage/lcov-report/lib/ActionCreator.js.html?a=1&b=2&c=1&c=2';

        var result = url.parse(str);

        expect(result.protocal).toBe('file');
        expect(result.path).toBe('/Users/leon/code/github/ei/coverage/lcov-report/lib/ActionCreator.js.html');
        expect(u.isObject(result.query)).toBe(true);

        expect(result.query.a).toBe('1');

        expect(result.query.b).toBe('2');

        expect(u.isArray(result.query.c)).toBe(true);


        expect(result.query.c.length).toBe(2);
        expect(result.query.c[0]).toBe('1');
        expect(result.query.c[1]).toBe('2');


    });

    it('parse', function () {

        var str = 'https://translate.google.com/?source=osdd#auto/zh-CN/bootstrap';

        var result = url.parse(str);

        expect(result.protocal).toBe('https');
        expect(result.host).toBe('translate.google.com');
        expect(result.search).toBe('?source=osdd');
        expect(result.path).toBe('/');

        expect(u.isObject(result.query)).toBe(true);
        expect(result.query.source).toBe('osdd');

        expect(result.hash).toBe('#auto/zh-CN/bootstrap');

    });

    it('parse host/port', function () {

        var str = 'https://1.2.3.4:1111/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese';

        var result = url.parse(str);

        expect(result.protocal).toBe('https');
        expect(result.host).toBe('1.2.3.4');
        expect(result.port).toBe(1111);
        expect(result.search).toBe('?query1=test&silly=willy');
        expect(result.path).toBe('/path/index.html');

        expect(u.isObject(result.query)).toBe(true);
        expect(result.query.query1).toBe('test');
        expect(result.query.silly).toBe('willy');

        expect(result.hash).toBe('#test=hash&chucky=cheese');

    });

    it('makeUrl', function () {

        var str = url.makeUrl('/path', {
            a: 1,
            b: 2
        });

        expect(str).toContain('/path');
        expect(str).toContain('?');
        expect(str).toContain('a=1');
        expect(str).toContain('b=2');

    });

});
