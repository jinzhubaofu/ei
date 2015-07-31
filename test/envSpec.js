/**
 * @file url spec
 * @author Leon(leon@outlook.com)
 */

var env = require('../lib/env.js');

describe('env', function () {

    it('env.isServer', function () {

        expect(env.isServer).toBe(true);

    });

    it('env.isClient', function () {

        expect(env.isClient).toBe(false);

    });

});
