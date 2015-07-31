/**
 * @file ActionCreator test
 * @author Leon(leon@outlook.com)
 */

var ActionCreator = require('../lib/ActionCreator');

var u = require('underscore');

describe('ei/ActionCreator', function () {

    it('ActionCreator should have a `extend` method', function () {
        expect(u.isFunction(ActionCreator.extend)).toBe(true);
    });

    describe('extend', function () {

        var test = ActionCreator.extend('haha');

        it('will return an Action and a ActionCreator should be a function', function () {

            expect(ActionCreator.is(test)).toBe(true);

            expect(u.isFunction(test)).toBe(true);

        });

    });

    describe('extend with default factory', function () {

        var test = ActionCreator.extend('haha');

        it('ActionCreator can create a action', function () {

            var action = test();

            expect(u.isObject(action)).toBe(true);

            expect(action.type).toBe('haha');

        });

    });

    describe('extend with custom factory', function () {

        var test = ActionCreator.extend('haha', function () {
            return {
                age: 18
            };
        });


        it('ActionCreator can create a action', function () {

            var action = test();

            expect(u.isObject(action)).toBe(true);

            expect(action.type).toBe('haha');

            expect(action.age).toBe(18);

        });

    });

    it('ActionCreator should have a `is` method', function () {
        expect(u.isFunction(ActionCreator.is)).toBe(true);
    });

});
