/**
 * @file 定位器
 *
 * 负责提供客户端上的url变化事件
 * 还可以通过pushState添加历史记录，修改location
 *
 * @author Leon(leon@outlook.com)
 * @module locator
 */

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
    start: function () {
        window.onhashchange = onHashChange;
    },
    stop: function () {
        window.onhashchange = null;
    },
    redirect: function (url) {
        location.hash = url;
    }
};

var historyLocator = {

    start: function () {
        window.onpopstate = onHistoryChange;
    },

    stop: function () {
        window.onpopstate = null;
    },

    redirect: function (url) {
        history.pushState(
            null,
            window.title,
            url
        );
    }

};

var locator = {

    setMode: function (mode) {
        this.mode = isHistorySupported() ? (mode || 'history') : 'hash';
        return this;
    },

    /**
     * 开始侦听浏览器的前进/后退事件
     *
     * @public
     * @method module:locator.start
     * @param {string} mode 模式：1. history, 2: hash 在不能使用 history api 时强制使用 hash 模式。否则默认使用 history 模式
     * @return {module:locator}
     */
    start: function (mode) {

        var locator = this.locator = !isHistorySupported() || mode === 'hash'
            ? hashLocator : historyLocator;

        locator.start();

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
     * @fires module:events~locator.redirect
     */
    redirect: function (path, query) {
        invariant(env.isClient, 'redirect cannot run on server');

        events.emit('locator.redirect');

        this.locator.redirect(url.makeUrl(path, query));

        this.emit('redirect', path, query);
    },

    createRequestFromLocation: function () {

        var uri = this.mode === 'hash'
            ? location.hash.slice(1)
            : location.href;

        return url.parse(uri);

    }

};

function onHashChange() {
    var uri = url.pasre(location.hash.slice(1));
    locator.emit('redirect', uri.path, uri.query);
}

/**
 * 页面发生了前进/后退事件处理函数
 *
 * @private
 * @param {Object} e popstate事件
 * @fires module:locator~redirect
 */
function onHistoryChange(e) {
    var uri = url.parse(location.href);
    locator.emit('redirect', uri.path, uri.query);
}

module.exports = Emitter.enable(locator);
