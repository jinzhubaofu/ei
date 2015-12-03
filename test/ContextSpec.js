/**
 * @file Context spec
 * @author Leon(leon@outlook.com)
 */

var Context = require('../src/Context.js');
var u = require('underscore');

describe('Context', function () {

    it('take a funciton as reducer', function () {

        expect(function () {

            new Context();

        }).toThrow();

        expect(function () {

            new Context({});

        }).toThrow();

        expect(function () {

            new Context({}, {});

        }).toThrow();

        expect(function () {

            new Context({}, function () {});

        }).not.toThrow();

    });

    it('has a `reducer` member', function () {

        var context = new Context({}, function () {});

        expect(u.isFunction(context.reducer)).toBe(true);

    });

    it('has a `store` member', function () {

        var store = {};

        var context = new Context(store, function () {});

        expect(context.store).toBe(store);

    });

    it('has a `dispatch` member', function () {

        var context = new Context({}, function () {});

        expect(u.isFunction(context.dispatch)).toBe(true);

    });

    it('has a `getState` member', function () {

        var context = new Context({}, function () {});

        expect(u.isFunction(context.getState)).toBe(true);

    });

    it('has a `listeners` member', function () {

        var context = new Context({}, function () {});

        expect(u.isArray(context.listeners)).toBe(true);

    });

    it('reduce', function () {

        var spy = jasmine.createSpy();

        var context = new Context({}, spy);

        var state = {};

        var action = {};

        context.reduce(state, action);

        expect(spy).toHaveBeenCalledWith(state, action);

    });

    it('getState / setState', function () {

        var spy = jasmine.createSpy();

        var state = {};

        var context = new Context(state, spy);

        expect(context.getState()).toBe(state);

        var state2 = {};

        context.setState(state2);

        expect(context.getState()).toBe(state2);


    });

    it('dispatch a plain action', function () {

        function reducer(state, action) {
            expect(state).toBe(1);
            return state + 1;
        }

        var context = new Context(1, reducer);

        var action = {
            type: 'add'
        };

        context.dispatch(action);

        expect(context.getState()).toBe(2);

    });

    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it('dispatch a function action', function () {

        function reducer(state, action) {
            return state + 1;
        }

        var context = new Context(1, reducer);

        var action = function (dispatch, state) {

            // 在这里可以得到所有的数据，还可以多次dispatch

            dispatch({
                type: 'add'
            });

            setTimeout(function() {
                dispatch({
                    type: 'add'
                });
            }, 100);

        };

        context.dispatch(action);

        expect(context.getState()).toBe(2);

        jasmine.clock().tick(101);

        expect(context.getState()).toBe(3);


    });

    it('addChangeListener / removeChangeListener', function () {

        var context = new Context(1, function (state, action) {

            return state + 1;

        });

        var spy = jasmine.createSpy();

        var spy2 = jasmine.createSpy();

        context.addChangeListener(spy);
        context.addChangeListener(spy2);


        context.dispatch({
            type: 'add'
        });

        expect(spy).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();

        context.removeChangeListener(spy);

        context.dispatch({
            type: 'add'
        });

        expect(spy.calls.count()).toBe(1);

        context.removeChangeListener(spy);

        context.dispatch({
            type: 'add'
        });

        expect(spy.calls.count()).toBe(1);

    });

});
