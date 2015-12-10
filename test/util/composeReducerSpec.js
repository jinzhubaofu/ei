/**
 * @file compose reducer spec
 * @author Leon(leon@outlook.com)
 */

var composeReducer = require('../../src/util/composeReducer');

describe('composeReducer', function () {

    it('is a function', function () {

        expect(typeof (composeReducer) === 'function').toBe(true);

    });

    it('will return a function', function () {

        expect(typeof (composeReducer()) === 'function').toBe(true);

    });

    it('will return reducer itself if reducers are a single function', function () {

        var reducers = function () {
        };

        expect(composeReducer(reducers)).toBe(reducers);

    });

    it('will return a composed function', function () {

        function A() {

            this.a = function (state, action) {
                return state + 1;
            };

            this.b = function (state, action) {
                return 100;
            };

        }

        A.prototype.c = function (state, action) {
            return state * 2;
        };

        var reducers = new A();

        var reducer = composeReducer(reducers);

        expect(typeof (reducer) === 'function').toBe(true);

        var state = {
            a: 1,
            c: 5,
            d: 6
        };

        var nextState = reducer(state, {});

        expect(nextState.a).toBe(2);
        expect(nextState.b).toBe(100);
        expect(nextState.c).toBe(5);
        expect(nextState.d).toBe(6);

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

        var State = function () {

            this.a = 1;
            this.b = 2;

        };

        State.prototype.c = 5;

        var state = new State();

        var nextState = reducer(state, {});

        expect(nextState).toBe(state);

    });


});
