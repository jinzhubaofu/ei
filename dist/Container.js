define('ei/Container', [
    'exports',
    './babelHelpers',
    'underscore'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var u = require('underscore');
    var Container = function Container() {
        this.boundCallbacks = {};
        this.singletonCallbacks = {};
        this.instantiatedSingletons = {};
        this.registeredObjects = {};
    };
    Container.prototype.make = function (name) {
        if (this.registeredObjects[name]) {
            return this.registeredObjects[name];
        }
        var args = u.toArray(arguments).slice(1);
        if (this.singletonCallbacks[name]) {
            var instances = this.instantiatedSingletons;
            var instance = instances[name];
            if (!instance) {
                instance = instances[name] = this.singletonCallbacks[name].apply(this, args);
            }
            return instance;
        }
        var boundCallback = this.boundCallbacks[name];
        return boundCallback ? boundCallback.apply(this, args) : null;
    };
    Container.prototype.bind = function (name, factory) {
        this.boundCallbacks[name] = factory;
        return this;
    };
    Container.prototype.singleton = function (name, factory) {
        this.singletonCallbacks[name] = factory;
        return this;
    };
    Container.prototype.register = function (name, object) {
        this.registeredObjects[name] = object;
        return this;
    };
    module.exports = Container;
});