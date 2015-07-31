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

var locator = {

    /**
     * 开始侦听浏览器的前进/后退事件
     *
     * @public
     * @method module:locator.start
     * @return {module:locator}
     */
    start: function () {

        window.onpopstate = onHistoryChange;

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

        window.onpopstate = null;

        return this;

    },

    /**
     * 对当前页面进行跳转操作
     *
     * @public
     * @method module:locator.redirect
     * @param {!string} path 跳转到的新地址
     * @param {?Object} query query参数
     * @return {boolean} 是否是pushState跳转
     * @fires module:events~locator.redirect
     */
    redirect: function (path, query) {

        invariant(env.isClient, 'redirect cannot run on server');

        var uri = url.makeUrl(path, query);

        if (isHistorySupported()) {

            events.emit('locator.redirect');

            history.pushState(
                null,
                window.title,
                uri
            );

            this.emit('redirect', path, query);

            return true;

        }

        return false;

    }

};

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
