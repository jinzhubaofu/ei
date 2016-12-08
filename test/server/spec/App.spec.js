/**
 * @file node environment test spec
 * @author leon <ludafa@outlook.com>
 */

const App  = require('../../../src/App.js');

/* eslint-disable max-nested-callbacks */

describe('App', function () {

    describe('load a page on server', function () {

        const app = new App({

            routes: [{
                path: '/a',
                page: 'a'
            }]

        });

        app.setBasePath(require('path').join(__dirname, 'page'));

        const promise = app.loadPage('a');

        it('will return a promise', function () {

            expect(typeof promise.then === 'function').toBe(true);

        });

        it('will return the test page', function () {

            promise
                .then(function (Page) {
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

        const app = new App({

            basePath: require('path').join(__dirname, 'page'),

            routes: [{

                path: '/a',
                page: 'a'

            }]

        });

        const request = {
            path: '/a'
        };


        app.execute(request).then(function (result) {

            expect(result.page).not.toBeFalsy();

        }, function (error) {

            // console.error(error);

        });

    });

    it('execute a request and return json', function () {

        const app = new App({

            basePath: require('path').join(__dirname, 'page'),

            routes: [{

                path: '/a',
                page: 'a'

            }]

        });

        const request = {
            path: '/a',
            xhr: true
        };


        app.execute(request).then(function (result) {

            expect(result.page).toBeFalsy();

        });

    });

    it('will trigger a error event to `events` if some error occurs in `execute`', function () {

        const app = new App({

            basePath: require('path').join(__dirname, 'page'),

            routes: [{

                path: '/b',
                page: 'b'

            }]

        });

        const request = {
            path: '/b'
        };

        app.execute(request).then(null, function (error) {
            expect(error).not.toBeFalsy();
        });


    });

    it('execute a request not routed', function () {

        const app = new App({

            basePath: require('path').join(__dirname, 'page'),

            routes: [{

                path: '/a',
                page: 'a'

            }]

        });

        const request = {
            path: '/b'
        };

        app.execute(request).catch(function (error) {

            expect(error).toEqual({
                status: 404
            });

        });


    });


});
