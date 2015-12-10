/**
 * @file event emitter spec
 * @author Leon(leon@outlook.com)
 */

var App = require('../src/App');

var Router = require('../src/Router');


describe('App', function () {

    it('will throw if create instance without options', function () {

        expect(function () {

            new App();

        }).toThrow();

    });

    it('will throw if create instance without routes', function () {

        expect(function () {

            new App({});

        }).toThrow();

    });

    it('have a router', function () {

        var app = new App({

            routes: []

        });

        expect(app.router instanceof Router).toBe(true);

    });

    it('can route a request', function () {

        var app = new App({
            routes: [{
                path: '/a',
                name: 'a'
            }]
        });

        var request = {
            pathname: '/a'
        };

        var route = app.route(request);

        expect(route.name).toBe('a');

        request.pathname = '/b';

        route = app.route(request);

        expect(route).toBe(void 0);

    });

    describe('load a page on server', function () {

        var app = new App({

            routes: [{
                path: '/a',
                page: 'a'
            }]

        });

        app.setBasePath(require('path').join(__dirname, 'page'));

        var promise = app.loadPage('a');

        it('will return a promise', function () {

            expect(typeof promise.then === 'function').toBe(true);

        });

        it('will return the test page', function () {

            promise.then(function (Page) {

                expect(typeof Page === 'function').toBe(true);

                expect(Page.type).toBe('test');

            })
            .then(function () {

                spyOn(app, 'resolveServerModule');

                app.loadPage('a').then(function () {

                    it('will cache the page', function () {

                        expect(app.resolveServerModule).not.toHaveBeenCalled();

                    });

                });

            });

        });

    });

    it('execute a request and return html', function () {

        var app = new App({

            basePath: require('path').join(__dirname, 'page'),

            routes: [{

                path: '/a',
                page: 'a'

            }]

        });

        var request = {
            path: '/a'
        };


        app.execute(request).then(function (result) {

            expect(result.page).not.toBeFalsy();

        }, function (error) {

            // console.error(error);

        });

    });

    it('execute a request and return json', function () {

        var app = new App({

            basePath: require('path').join(__dirname, 'page'),

            routes: [{

                path: '/a',
                page: 'a'

            }]

        });

        var request = {
            path: '/a',
            xhr: true
        };


        app.execute(request).then(function (result) {

            expect(result.page).toBeFalsy();

        });

    });

    it('execute a request not routed', function () {

        var app = new App({

            basePath: require('path').join(__dirname, 'page'),

            routes: [{

                path: '/a',
                page: 'a'

            }]

        });

        var request = {
            path: '/b'
        };



        app.execute(request).catch(function (error) {

            expect(error).toEqual({
                status: 404
            });

        });


    });

    it('will trigger a error event to `events` if some error occurs in `execute`', function () {

        var app = new App({

            basePath: require('path').join(__dirname, 'page'),

            routes: [{

                path: '/b',
                page: 'b'

            }]

        });

        var request = {
            path: '/b'
        };

        app.execute(request).then(null, function (error) {

            expect(error).not.toBeFalsy();

        });


    });

});
