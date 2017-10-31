/**
 * @file router spec
 * @author Leon(leon@outlook.com)
 */

import Router from '../../../src/Router';

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

        var route = router.route({pathname: '/a'});

        expect(route.name).toBe('aaaa');

        route = router.route({pathname: '/b'});

        expect(route).toBe(void 0);

        route = router
            .addRoute({path: '/b', name: 'bbbb'})
            .route({pathname: '/b'});

        expect(route.name).toBe('bbbb');


    });

    it('will have a method to add route', function () {

        var router = new Router();

        expect(typeof (router.addRoute) === 'function').toBe(true);

    });


});
