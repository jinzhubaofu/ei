/**
 * @file locator spec
 * @author Leon(leon@outlook.com)
 */

var locator = require('../lib/locator.js');
var u = require('underscore');

describe('locator', function () {


    beforeEach(function () {

        var history = {
            pushState: function () {

            }
        };

        global.window = {
            title: 'ei',
            history: history
        };

        global.location = {
            href: 'http://www.baidu.com/test?a=1'
        };

        global.history = history;

    });

    afterEach(function () {

        global.window = global.location = global.history = null;

    });

    it('start/stop will take over the window.onpopstate handler', function () {

        locator.start();

        expect(u.isFunction(window.onpopstate)).toBe(true);

        locator.stop();

        expect(u.isFunction(window.onpopstate)).toBe(false);

    });

    it('will fire redirect event while history changed', function () {


        locator.start();


        var spy = jasmine.createSpy();

        locator.on('redirect', spy);

        window.onpopstate();

        expect(spy).toHaveBeenCalledWith('/test', {a: '1'});


    });

    it('redirect will trigger error thrown on server', function () {

        expect(function () {

            locator.redirect('/a');

        }).toThrow();

    });

    it(''
        + 'redirect will push a new record in history '
        + 'and trigger a `redirect` event on a history supported browser.',
        function () {

            var env = require('../lib/env');

            var isServer = env.isServer;

            env.isServer = false;
            env.isClient = true;

            var spy = jasmine.createSpy();

            global.history = {
                pushState: spy
            };


            var redirectSpy = jasmine.createSpy('redirect');

            locator.on('redirect', redirectSpy);

            var redirected = locator.redirect('/test', {a: 1});

            expect(spy).toHaveBeenCalledWith(null, window.title, '/test?a=1');
            expect(redirectSpy).toHaveBeenCalledWith('/test', {a: 1});

            expect(redirected).toBe(true);

            env.isServer = isServer;
            env.isClient = !isServer;

        }
    );

    it('redirect will redirect the browser on a history unsupported browser', function () {

        var env = require('../lib/env');

        var isServer = env.isServer;

        env.isServer = false;
        env.isClient = true;

        var spy = jasmine.createSpy();

        window.history = null;

        locator.on('redirect', spy);

        var redirected = locator.redirect('/test', {a: 1});

        expect(spy).not.toHaveBeenCalled();

        expect(redirected).toBe(false);

        env.isServer = isServer;
        env.isClient = !isServer;

    });

});
