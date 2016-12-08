/**
 * @file env spec
 * @author leon <ludafa@outlook.com>
 */

const env = require('../../../src/env.js');

describe('env', function () {

    it('isServer should be true', function () {
        expect(env.isServer).toBe(true);
    });

    it('isClient should be false', function () {
        expect(env.isClient).toBe(false);
    });

});
