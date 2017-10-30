/**
 * @file 环境探测
 * @author Leon(leon@outlook.com)
 * @module env
 * @inner
 */

/**
 * 是否为服务器端环境
 *
 * @member {boolean}
 */
let isServer = false;

/**
 * 是否为客户端环境
 *
 * @member {boolean}
 */
let isClient = false;

try {


    isServer = 'object' === (
        typeof process
        && Object.prototype.toString.call(process) === '[object process]'
    );
}
catch (e) {
    isClient = true;
}


export {
    isServer,
    isClient
}
