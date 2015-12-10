/**
 * @file compose middlewares spec
 * @author Leon(leon@outlook.com)
 */

var composeMiddleware = require('../../src/util/composeMiddleware.js');

describe('composeMiddleware', function () {

    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it('is a function', function () {

        expect(typeof (composeMiddleware) === 'function').toBe(true);

    });

    it('will return a function', function () {

        var spy1 = jasmine.createSpy('middleware1');
        var spy2 = jasmine.createSpy('middleware2');
        var spy3 = jasmine.createSpy('middleware3');

        var action1 = {
            type: 'ASYNC_START'
        };

        var action2 = {
            type: 'ASYNC_FINISHED'
        };

        var middlewares = [
            function (state, action, next) {

                spy1(action);

                next(action1);

                setTimeout(
                    function () {
                        next(action2);
                    },
                    5
                );

            },
            function (state, action, next) {
                spy2(action);
                var result = next(action);
                return result;
            }
        ];

        var context = {
            dispatch: function (action) {
                spy3(action);
                return action;
            },
            getState: function () {
                return {};
            }
        };

        var finalDispatch = composeMiddleware(context, middlewares);

        expect(typeof (finalDispatch) === 'function').toBe(true);

        finalDispatch(action1);

        jasmine.clock().tick(100);

        expect(spy1).toHaveBeenCalledWith(action1);
        expect(spy2).toHaveBeenCalledWith(action1);
        expect(spy2).toHaveBeenCalledWith(action2);
        expect(spy3).toHaveBeenCalledWith(action1);
        expect(spy3).toHaveBeenCalledWith(action2);

    });

});
