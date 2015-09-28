define('ei/Page', [
    'exports',
    './babelHelpers',
    'underscore',
    'react',
    './component/ConextProvider',
    './Context',
    './util/composeReducer',
    './util/invariant',
    './events'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var u = require('underscore');
    var React = require('react');
    var ContextProvider = require('./component/ConextProvider');
    var Context = require('./Context');
    var componseReducer = require('./util/composeReducer');
    var invariant = require('./util/invariant');
    var events = require('./events');
    function Page(initialState) {
        this.context = new Context(initialState, componseReducer(this.reducer), this.middlewares);
    }
    var PagePrototype = {
        init: function init(initialState) {
            this.dispatch({
                type: 'init',
                data: initialState
            });
            return this;
        },
        createElement: function createElement() {
            var view = this.view;
            return React.createElement(ContextProvider, { ei: this.context }, function () {
                return React.createElement(view);
            });
        },
        render: function render(target) {
            React.render(this.createElement(), target);
            return this;
        },
        renderToString: function renderToString() {
            return React.renderToString(this.createElement());
        },
        getState: function getState() {
            return this.context.getState();
        },
        dispatch: function dispatch(action) {
            events.emit('page-dispatch', action);
            this.context.dispatch(action);
            return action;
        },
        getInitialState: function getInitialState(request) {
            return {};
        },
        dispose: function dispose() {
            events.emit('page-dispose');
            return this;
        }
    };
    Page.extend = function (proto) {
        invariant(proto, 'create Page need options');
        invariant(proto.reducer, 'Pager must have a reducer');
        invariant(proto.view, 'Pager must have a view');
        function SubPage(initialState) {
            Page.call(this, initialState);
        }
        u.extend(SubPage.prototype, PagePrototype, proto);
        return SubPage;
    };
    module.exports = Page;
});