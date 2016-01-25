/**
 * @file bean container copy from inverse
 * @author Leon(leon@outlook.com)
 */

/**
 * IOC窗口
 *
 * @constructor Container
 */
function Container() {
    this.boundCallbacks = {};
    this.singletonCallbacks = {};
    this.instantiatedSingletons = {};
    this.registeredObjects = {};
}

/**
 * 生成一个指定的实例
 *
 * @public
 * @param {!string} name 资源标识符
 * @return {*}
 */
Container.prototype.make = function (name) {

    if (this.registeredObjects[name]) {
        return this.registeredObjects[name];
    }

    if (this.singletonCallbacks[name]) {

        var instances = this.instantiatedSingletons;
        var instance = instances[name];

        if (!instance) {
            instance = instances[name] = this.singletonCallbacks[name].apply(this, arguments);
        }

        return instance;
    }


    var boundCallback = this.boundCallbacks[name];

    return boundCallback ? boundCallback.apply(this, arguments) : null;

};

/**
 * 绑定一个factory
 *
 * 当请求这个资源时会通过factory生成新的实例
 * 每次都会生成一个新的实例
 *
 * @param {!string}   name    资源标识符
 * @param {!Function} factory 工厂函数
 * @return {module:Container}
 */
Container.prototype.bind = function (name, factory) {
    this.boundCallbacks[name] = factory;
    return this;
};

/**
 * 注册一个单例资源
 *
 * 当请求这个资源时会通过factory生成新的实例
 * 但是只会生成一个此类资源
 *
 * @param {!string}   name    资源标识符
 * @param {!Function} factory 资源工厂函数
 * @return {module:Container}
 */
Container.prototype.singleton = function (name, factory) {
    this.singletonCallbacks[name] = factory;
    return this;
};

/**
 * 注册一个资源
 *
 * 这个与bind和singleton的区别是，
 * 这里直接注册一个资源，给的是个object，而不是工厂函数
 * 不会经过工厂函数创建资源实例了
 *
 * @param {!string} name   资源标识符
 * @param {*}       object 资源对象
 * @return {module:Container}
 */
Container.prototype.register = function (name, object) {
    this.registeredObjects[name] = object;
    return this;
};

module.exports = Container;
