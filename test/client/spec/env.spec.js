/**
 * @file url spec
 * @author Leon(leon@outlook.com)
 */

const env = require('../../../src/env.js');

describe('env', function () {

    it('env.isServer', function () {
        expect(env.isServer).toBe(false);
    });

    it('env.isClient', function () {
        expect(env.isClient).toBe(true);
    });

});
