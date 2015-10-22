define('ei/Page', [
    'require',
    'exports',
    'module',
    'underscore',
    'react',
    './component/ContextProvider',
    './Context',
    './util/composeReducer',
    './util/invariant',
    './events',
    './Emitter'
], function (require, exports, module) {
    var u = require('underscore');
    var React = require('react');
    var ContextProvider = require('./component/ContextProvider');
    var Context = require('./Context');
    var componseReducer = require('./util/composeReducer');
    var invariant = require('./util/invariant');
    var events = require('./events');
    function Page(initialState) {
        this.initialize(initialState);
    }
    Page.prototype = {
        constructor: Page,
        initialize: function initialize(initialState) {
            this.context = new Context(initialState, componseReducer(this.reducer), u.map(this.middlewares, function (middlewareCreator) {
                return middlewareCreator(this);
            }, this));
        },
        middlewares: [],
        init: function init(initialState) {
            this.dispatch({
                type: 'INIT',
                payload: initialState
            });
            return this;
        },
        createElement: function createElement() {
            var view = this.view;
            return React.createElement(ContextProvider, { ei: this.context }, React.createElement(view));
        },
        getState: function getState() {
            return this.context.getState();
        },
        setState: function setState(state) {
            this.context.setState(state);
            return this;
        },
        dispatch: function dispatch(action) {
            events.emit('page-dispatch', action);
            this.emit('dispatch');
            this.context.dispatch(action);
            return action;
        },
        getInitialState: function getInitialState(request) {
            return {};
        },
        dispose: function dispose() {
            events.emit('page-dispose');
            this.emit('dispose');
            return this;
        }
    };
    require('./Emitter').enable(Page);
    Page.extend = function (proto) {
        invariant(proto, 'create Page need options');
        invariant(proto.reducer, 'Pager must have a reducer');
        invariant(proto.view, 'Pager must have a view');
        function SubPage(initialState) {
            Page.call(this, initialState);
        }
        u.extend(SubPage.prototype, Page.prototype, proto);
        return SubPage;
    };
    module.exports = Page;
});