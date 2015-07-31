/**
 * @file bind actions spec
 * @author Leon(leon@outlook.com)
 */

var u = require('underscore');
var bindActions = require('../../lib/util/bindActions');

describe('bindActions', function () {

    it('bindActions', function () {

        expect(u.isFunction(bindActions)).toBe(true);

        expect(function () {

            bindActions();

        }).toThrow();

        expect(function () {

            bindActions(function () {});

        }).toThrow();

        var dispatch = jasmine.createSpy();

        var bound = bindActions(dispatch, {
            a: function () {

            },
            b: function () {
                return {};
            }
        });

        expect(u.isObject(bound)).toBe(true);
        expect(u.isFunction(bound.a)).toBe(true);
        expect(u.isFunction(bound.b)).toBe(true);


        expect(function () {
            bound.a();
        }).toThrow();

        bound.b();

        expect(dispatch).toHaveBeenCalled();

    });

});
