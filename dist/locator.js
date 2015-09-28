define('ei/locator', [
    'exports',
    './babelHelpers',
    './events',
    './env',
    './Emitter',
    './util/invariant',
    './url'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var events = require('./events');
    var env = require('./env');
    var Emitter = require('./Emitter');
    var invariant = require('./util/invariant');
    var url = require('./url');
    function isHistorySupported() {
        return !!window.history;
    }
    var hashLocator = {
        start: function start() {
            window.onhashchange = onHashChange;
        },
        stop: function stop() {
            window.onhashchange = null;
        },
        redirect: function redirect(url) {
            location.hash = url;
        }
    };
    var historyLocator = {
        start: function start() {
            window.onpopstate = onHistoryChange;
        },
        stop: function stop() {
            window.onpopstate = null;
        },
        redirect: function redirect(url) {
            history.pushState(null, window.title, url);
        }
    };
    var locator = {
        setMode: function setMode(mode) {
            this.mode = isHistorySupported() ? mode || 'history' : 'hash';
            return this;
        },
        start: function start(mode) {
            var locator = this.locator = !isHistorySupported() || mode === 'hash' ? hashLocator : historyLocator;
            locator.start();
            return this;
        },
        stop: function stop() {
            this.locator.stop();
            return this;
        },
        redirect: function redirect(path, query) {
            invariant(env.isClient, 'redirect cannot run on server');
            events.emit('locator.redirect');
            this.locator.redirect(url.makeUrl(path, query));
            this.emit('redirect', path, query);
        },
        createRequestFromLocation: function createRequestFromLocation() {
            var uri = this.mode === 'hash' ? location.hash.slice(1) : location.href;
            return url.parse(uri);
        }
    };
    function onHashChange() {
        var uri = url.pasre(location.hash.slice(1));
        locator.emit('redirect', uri.path, uri.query);
    }
    function onHistoryChange(e) {
        var uri = url.parse(location.href);
        locator.emit('redirect', uri.path, uri.query);
    }
    module.exports = Emitter.enable(locator);
});