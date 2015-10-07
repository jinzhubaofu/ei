/**
 * @file 定位器
 *
 * 负责提供客户端上的url变化事件
 * 还可以通过pushState添加历史记录，修改location
 *
 * @author Leon(leon@outlook.com)
 * @module locator
 */

var u = require('underscore');
var events = require('./events');
var env = require('./env');
var Emitter = require('./Emitter');
var invariant = require('./util/invariant');
var url = require('./url');

/**
 * 当前客户端是否支持历史api
 *
 * @private
 * @return {boolean}
 */
function isHistorySupported() {
    return !!window.history;
}

var hashLocator = {

    getLocation: function () {
        var href = location.href;
        var index = href.indexOf('#');
        return index > 0 ? href.slice(index + 1) : '';
    },

    start: function () {
        window.onhashchange = u.bind(onRequest, null, this.getLocation);
    },

    stop: function () {
        window.onhashchange = null;
    },

    /**
     * 更新URL
     *
     * @param {string} url 下一个状态的url
     * @return {boolean} 是否有改变url
     */
    updateURL: function (url) {

        // 此时浏览器时触发一个`hashchange`事件出来
        // 我们会在事件处理函数中释放出locator的`redirect`事件来
        if (this.getLocation() !== url) {
            location.hash = url;
            return true;
        }

        return false;

    }

};

var historyLocator = {

    getLocation: function () {
        return location.href;
    },

    start: function () {
        window.onpopstate = u.bind(onRequest, null, this.getLocation);
    },

    stop: function () {
        window.onpopstate = null;
    },

    /**
     * 更新URL
     *
     * @param {string} url 下一个状态的url
     * @return {boolean} 是否有改变url
     */
    updateURL: function (url) {

        var originUrl = location.pathname + location.search;

        if (originUrl !== url) {

            history.pushState(
                null,
                window.title,
                url
            );

            onRequest(this.getLocation);

            return true;
        }

        return false;

    }

};

var locator = {

    /**
     * 初始化
     *
     * @param {string} mode 模式：1. history, 2: hash 在不能使用 history api 时强制使用 hash 模式。否则默认使用 history 模式
     * @return {module:locator}
     */
    init: function (mode) {

        invariant(env.isClient, 'locator cannot run on server');

        if (env.isClient) {
            this.mode = isHistorySupported() ? (mode || 'history') : 'hash';
        }

        return this;

    },

    /**
     * 开始侦听浏览器的前进/后退事件
     *
     * @public
     * @method module:locator.start
     * @return {module:locator}
     */
    start: function () {

        invariant(env.isClient, 'locator cannot run on server');

        var locator = this.mode === 'hash' ? hashLocator : historyLocator;

        locator.start();

        this.locator = locator;

        return this;

    },

    /**
     * 停止浏览器的前进/后退事件
     *
     * @public
     * @method module:locator.stop
     * @return {module:locator}
     */
    stop: function () {

        this.locator.stop();

        return this;

    },

    /**
     * 对当前页面进行跳转操作
     *
     * @public
     * @method module:locator.redirect
     * @param {!string} path 跳转到的新地址
     * @param {?Object} query query参数
     * @param {?boolean} force 是否强制刷新
     * @return {boolean} 是否触发了`redirect`事件
     * @fires module:events~locator.redirect
     */
    redirect: function (path, query, force) {

        invariant(env.isClient, 'redirect cannot run on server');

        events.emit('locator.redirect');

        var changed = this.locator.updateURL(url.makeUrl(path, query));
        var shouldEmitRedirect = changed || force;

        if (shouldEmitRedirect) {
            this.emit('redirect', path, query);
        }

        return shouldEmitRedirect;

    },

    reload: function () {
        var uri = this.createRequestFromLocation();
        this.redirect(uri.path, uri.query, true);
    },

    createRequestFromLocation: function () {

        var uri = this.mode === 'hash'
            ? location.hash.slice(1)
            : location.href;

        return url.parse(uri);

    }

};

/**
 * 页面发生了前进/后退事件处理函数
 *
 * @private
 * @param {Function} getLocation 解析当前浏览器的locaiton函数
 * @fires module:locator~redirect
 */
function onRequest(getLocation) {
    var loc = getLocation();
    var uri = url.parse(loc);
    locator.emit('redirect', uri.path, uri.query);
}

module.exports = Emitter.enable(locator);
