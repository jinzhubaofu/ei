/**
 * @file bind actions spec
 * @author Leon(leon@outlook.com)
 */

var bindActions = require('../../src/util/bindActions');

describe('bindActions', function () {

    it('bindActions', function () {

        expect(typeof bindActions === 'function').toBe(true);

        expect(function () {

            bindActions();

        }).toThrow();

        expect(function () {
            bindActions('a');
        }).toThrow();

        var dispatch = jasmine.createSpy();

        var bound = bindActions(dispatch, {
            a: function () {

            },
            b: function () {
                return {};
            }
        });

        expect(typeof bound === 'object').toBe(true);
        expect(typeof bound.a === 'function').toBe(true);
        expect(typeof bound.b === 'function').toBe(true);


        expect(function () {
            bound.a();
        }).toThrow();

        bound.b();

        expect(dispatch).toHaveBeenCalled();

    });

});
