define('ei/locator', [
    'require',
    'exports',
    'module',
    'underscore',
    './events',
    './env',
    './Emitter',
    './util/invariant',
    './url'
], function (require, exports, module) {
    var u = require('underscore');
    var events = require('./events');
    var env = require('./env');
    var Emitter = require('./Emitter');
    var invariant = require('./util/invariant');
    var url = require('./url');
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
        updateURL: function (url) {
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
        updateURL: function (url) {
            var originUrl = location.pathname + location.search;
            if (originUrl !== url) {
                history.pushState(null, window.title, url);
                onRequest(this.getLocation);
                return true;
            }
            return false;
        }
    };
    var locator = {
        init: function (mode) {
            invariant(env.isClient, 'locator cannot run on server');
            if (env.isClient) {
                this.mode = isHistorySupported() ? mode || 'history' : 'hash';
            }
            return this;
        },
        start: function () {
            invariant(env.isClient, 'locator cannot run on server');
            var locator = this.mode === 'hash' ? hashLocator : historyLocator;
            locator.start();
            this.locator = locator;
            return this;
        },
        stop: function () {
            this.locator.stop();
            return this;
        },
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
            var uri = this.mode === 'hash' ? location.hash.slice(1) : location.href;
            return url.parse(uri);
        }
    };
    function onRequest(getLocation) {
        var loc = getLocation();
        var uri = url.parse(loc);
        locator.emit('redirect', uri.path, uri.query);
    }
    module.exports = Emitter.enable(locator);
});