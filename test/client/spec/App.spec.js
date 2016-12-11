/**
 * @file event emitter spec
 * @author Leon(leon@outlook.com)
 */

const App = require('../../../src/App');
const Page = require('../../../src/Page');
const Router = require('../../../src/Router');

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

        let app = new App({
            routes: []
        });

        expect(app.router instanceof Router).toBe(true);

    });

    it('can route a request', function () {

        let app = new App({
            routes: [{
                path: '/a',
                page: 'a'
            }]
        });

        let request = {
            pathname: '/a'
        };

        let route = app.route(request);

        expect(route.page).toBe('a');

        request.pathname = '/b';

        route = app.route(request);

        expect(route).toBe(void 0);

    });


});
