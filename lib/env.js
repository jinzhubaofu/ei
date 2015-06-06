/**
 * @file ei/env
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

try {
    exports.isServer = 'object' === typeof process && Object.prototype.toString.call(process) === '[object process]';
}
catch(e) {}

exports.isClient = !exports.isServer;
