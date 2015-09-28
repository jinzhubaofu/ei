define('ei/resource', [
    'exports',
    './babelHelpers',
    './Container'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var Container = require('./Container');
    var container = new Container();
    exports.register = function (type, resource) {
        container.register(type, resource);
        return this;
    };
    exports.get = function (type) {
        return container.make(type);
    };
});