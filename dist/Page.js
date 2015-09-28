define('ei/Page', [
    'require',
    'exports',
    'module',
    'underscore',
    'react',
    'react-dom',
    './component/ConextProvider',
    './Context',
    './util/composeReducer',
    './util/invariant',
    './events'
], function (require, exports, module) {
    var u = require('underscore');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var ContextProvider = require('./component/ConextProvider');
    var Context = require('./Context');
    var componseReducer = require('./util/composeReducer');
    var invariant = require('./util/invariant');
    var events = require('./events');
    function Page(initialState) {
        this.context = new Context(initialState, componseReducer(this.reducer), this.middlewares);
    }
    var PagePrototype = {
        init: function (initialState) {
            this.dispatch({
                type: 'init',
                data: initialState
            });
            return this;
        },
        createElement: function () {
            var view = this.view;
            return React.createElement(ContextProvider, { ei: this.context }, function () {
                return React.createElement(view);
            });
        },
        render: function (target) {
            ReactDOM.render(this.createElement(), target);
            return this;
        },
        renderToString: function () {
            return ReactDOM.renderToString(this.createElement());
        },
        getState: function () {
            return this.context.getState();
        },
        dispatch: function (action) {
            events.emit('page-dispatch', action);
            this.context.dispatch(action);
            return action;
        },
        getInitialState: function (request) {
            return {};
        },
        dispose: function () {
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