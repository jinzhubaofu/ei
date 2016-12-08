/**
 * @file 环境探测
 * @author Leon(leon@outlook.com)
 * @module env
 * @inner
 */

let isServer = false;

try {
    isServer = typeof window === 'undefined';
}
catch (e) {
}

/**
 * 是否为服务器端环境
 *
 * @member {boolean}
 */
exports.isServer = isServer;



/**
 * 是否为客户端环境
 *
 * @member {boolean}
 */
exports.isClient = !exports.isServer;
