/**
 * @file invaraint spec
 * @author Leon(leon@outlook.com)
 */

let invariant = require('../../../../src/util/invariant.js');

describe('invariant', function () {

    it('will throw error if no format provided', function () {

        expect(function () {

            invariant(false);

        }).toThrowError(''
            + 'Minified exception occurred; use the non-minified dev environment '
            + 'for the full error message and additional helpful warnings.'
        );

    });


    it('should work with a message', function () {

        expect(function () {

            invariant(true, 'invariant message');

        }).not.toThrow();


        expect(function () {

            invariant(false, 'invariant message');

        }).toThrow();

    });

    it('should give the inspect the message', function () {


        expect(function () {

            invariant(false, '%s, %s', 123, 456);

        }).toThrowError('Invariant Violation: 123, 456');


    });


});
