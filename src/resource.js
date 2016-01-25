/**
 * @file 资源容器
 *
 * 我们知道在客户端上，我们只能使用ajax/socket两种途径操纵资源
 * 而在服务器端上，可选的资源服务非常多，比如mysql/mongodb/redis或者他们数据服务
 *
 * 因此，我们提供了这个模块，用来处理资源在不同平台上的差异性
 *
 * 我们通过ioc容器来对资源依赖进行解耦，
 *
 * 在不同平台上注入相同接口的资源操纵对象，
 *
 * 在同构代码中使用`get`方法获取到这些对象，直接使用即可
 *
 * @author Leon(leon@outlook.com)
 * @module resource
 */

const Container = require('./Container');

const container = new Container();

/**
 * 注册一个资源操作对象
 *
 * @method module:Resource.reigist
 *
 * @param {!string} type 资源标识符
 * @param {(Object | Function)} resource 资源操纵对象
 *
 * @return {module:Resource}
 */
exports.register = function (type, resource) {
    container.register(type, resource);
    return this;
};

/**
 * 获取一个资源操作对象
 *
 * @method module:Resource.get
 *
 * @param {!string} type 资源标识符
 *
 * @return {(Object | Function)}
 */
exports.get = function (type) {
    return container.make(type);
};
