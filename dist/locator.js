define('ei/locator', [
    'require',
    'exports',
    'module',
    './events',
    './env',
    './Emitter',
    './util/invariant',
    './url'
], function (require, exports, module) {
    var events = require('./events');
    var env = require('./env');
    var Emitter = require('./Emitter');
    var invariant = require('./util/invariant');
    var url = require('./url');
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
            history.pushState(null, window.title, url);
        }
    };
    var locator = {
        setMode: function (mode) {
            this.mode = isHistorySupported() ? mode || 'history' : 'hash';
            return this;
        },
        start: function (mode) {
            this.setMode(mode);
            var locator = this.mode === 'hash' ? hashLocator : historyLocator;
            locator.start();
            return this;
        },
        stop: function () {
            this.locator.stop();
            return this;
        },
        redirect: function (path, query) {
            invariant(env.isClient, 'redirect cannot run on server');
            events.emit('locator.redirect');
            this.locator.redirect(url.makeUrl(path, query));
            this.emit('redirect', path, query);
        },
        createRequestFromLocation: function () {
            var uri = this.mode === 'hash' ? location.hash.slice(1) : location.href;
            return url.parse(uri);
        }
    };
    function onHashChange() {
        var uri = url.parse(location.hash.slice(1));
        locator.emit('redirect', uri.path, uri.query);
    }
    function onHistoryChange(e) {
        var uri = url.parse(location.href);
        locator.emit('redirect', uri.path, uri.query);
    }
    module.exports = Emitter.enable(locator);
});