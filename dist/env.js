define('ei/env', [
    'exports',
    './babelHelpers'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    try {
        exports.isServer = 'object' === typeof process && Object.prototype.toString.call(process) === '[object process]';
    } catch (e) {
    }
    exports.isClient = !exports.isServer;
});