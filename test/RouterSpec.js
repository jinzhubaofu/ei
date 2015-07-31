/**
 * @file router spec
 * @author Leon(leon@outlook.com)
 */

var u = require('underscore');
var Router = require('../lib/Router.js');

describe('Router', function () {

    it('will have a member named routes', function () {

        var router = new Router();

        expect(router.routes instanceof Array).toBe(true);

    });

    it('route', function () {

        var routes = [{
            path: '/a',
            name: 'aaaa'
        }];

        var router = new Router(routes);

        var route = router.route({path: '/a'});

        expect(u.isObject(route)).toBe(true);
        expect(route.name).toBe('aaaa');

        route = router.route({path: '/b'});

        expect(route).toBe(void 0);

        route = router
            .addRoute({path: '/b', name: 'bbbb'})
            .route({path: '/b'});

        expect(u.isObject(route)).toBe(true);
        expect(route.name).toBe('bbbb');


    });

    it('will have a method to add route', function () {

        var router = new Router();

        expect(u.isFunction(router.addRoute)).toBe(true);

    });


});
