/**
 * @file compose reducer spec
 * @author Leon(leon@outlook.com)
 */

var u = require('underscore');
var composeReducer = require('../../lib/util/composeReducer');

describe('composeReducer', function () {

    it('is a function', function () {

        expect(u.isFunction(composeReducer)).toBe(true);

    });

    it('will return a function', function () {

        expect(u.isFunction(composeReducer())).toBe(true);

    });

    it('will return reducer itself if reducers are a single function', function () {

        var reducers = function () {
        };

        expect(composeReducer(reducers)).toBe(reducers);

    });

    it('will return a composed function', function () {

        var reducers = {
            a: function (state, action) {

                return state + 1;

            },

            b: function (state, action) {

                return state - 1;

            }
        };

        var reducer = composeReducer(reducers);

        var state = {
            a: 1,
            b: 1
        };

        var nextState = reducer(state, {});

        expect(nextState.a).toBe(2);
        expect(nextState.b).toBe(0);

    });

    it('will return the same store if reducer do no changes', function () {

        var reducers = {
            a: function (state, action) {
                return state;
            },
            b: function (state, action) {
                return state;
            }
        };

        var reducer = composeReducer(reducers);

        var state = {
            a: 1,
            b: 1
        };

        var nextState = reducer(state, {});

        expect(nextState).toBe(state);

    });


});
