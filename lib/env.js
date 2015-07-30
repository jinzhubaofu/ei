/**
 * @file 环境探测
 * @author Leon(leon@outlook.com)
 * @module env
 * @inner
 */

try {

    /**
     * 是否为服务器端环境
     *
     * @member {boolean}
     */
    exports.isServer = 'object' === typeof process && Object.prototype.toString.call(process) === '[object process]';
}
catch(e) {}




/**
 * 是否为客户端环境
 *
 * @member {boolean}
 */
exports.isClient = !exports.isServer;
