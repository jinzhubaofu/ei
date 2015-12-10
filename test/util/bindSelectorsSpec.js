/**
 * @file bind selectors spec
 * @author Leon(leon@outlook.com)
 */

var bindSelectors = require('../../src/util/bindSelectors.js');

describe('bindSelectors', function () {

    it('is a function', function () {

        expect(typeof (bindSelectors) === 'function').toBe(true);

    });

    it('will return a function', function () {

        expect(typeof (bindSelectors()) === 'function').toBe(true);

    });

    it('will throw if no store provided', function () {

        var select = bindSelectors();

        expect(function () {

            select();

        }).toThrow();

    });

    it('will pass the store whole to the selector if selectors is function', function () {

        var store = {};

        var select = bindSelectors(function (state) {

            expect(state).toBe(store);

            return state;

        });


        var data = select(store);

        expect(data).toBe(store);

    });

    it('will select all data from store if selectors is true', function () {

        var select = bindSelectors(true);

        var store = {};

        var data = select(store);

        expect(data).toBe(store);

    });

    it('will return a empty object if selectors is null/undefined/false', function () {

        var select1 = bindSelectors(false);

        var store1 = {
            a: 1
        };

        var data1 = select1(store1);

        expect(data1).toEqual({});

        var select2 = bindSelectors(null);

        var store2 = {
            a: 1
        };

        var data2 = select2(store2);

        expect(data2).toEqual({});

        var select3 = bindSelectors(void 0);

        var store = {
            a: 1
        };

        var data3 = select3(store);

        expect(data3).toEqual({});

    });

    it('will return a specific property from store if selectors is object', function () {

        var select = bindSelectors({

            a: function (store) {
                return store.name;
            }

        });

        var store = {
            a: {
                name: 'test'
            }
        };

        var data = select(store);

        expect(data).toEqual({
            a: 'test'
        });

    });

    it('will return a specific property from store if selectors is string/number', function () {

        var select1 = bindSelectors('name');
        var select2 = bindSelectors(0);

        var store = {
            name: 'aaa',
            0: 'bbb'
        };

        var data1 = select1(store);
        var data2 = select2(store);

        expect(data1).toBe('aaa');
        expect(data2).toBe('bbb');

    });


});
