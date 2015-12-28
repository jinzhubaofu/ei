define('ei/Page', [
    'require',
    'exports',
    'module',
    './util/assign',
    'react',
    './component/ContextProvider',
    './Context',
    './util/composeReducer',
    './util/invariant',
    './util/guid',
    './events',
    './actionCreator/page',
    './middleware/pageActionEventProxy',
    './Emitter',
    './util/createPageComponent',
    './component/Page'
], function (require, exports, module) {
    var assign = require('./util/assign');
    var React = require('react');
    var ContextProvider = require('./component/ContextProvider');
    var Context = require('./Context');
    var componseReducer = require('./util/composeReducer');
    var invariant = require('./util/invariant');
    var guid = require('./util/guid');
    var events = require('./events');
    var _require = require('./actionCreator/page');
    var _init = _require.init;
    function Page(initialState) {
        this.initialize(initialState);
    }
    Page.prototype = {
        constructor: Page,
        initialize: function initialize(initialState) {
            var _this = this;
            this.context = new Context(initialState, componseReducer(this.reducer), this.middlewares.map(function (middlewareCreator) {
                return middlewareCreator(_this);
            }));
            this.id = guid();
        },
        middlewares: [require('./middleware/pageActionEventProxy')],
        init: function init(initialState) {
            this.dispatch(_init(initialState));
            return this;
        },
        createElement: function createElement(props) {
            var context = this.context;
            var View = this.view;
            return React.createElement(ContextProvider, { ei: context }, React.createElement(View, props));
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
            this.emit('dispatch', action);
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
    var createPageComponent = require('./util/createPageComponent');
    Page.extend = function (proto) {
        invariant(proto, 'create Page need options');
        invariant(proto.reducer, 'Pager must have a reducer');
        invariant(proto.view, 'Pager must have a view');
        function SubPage(initialState) {
            Page.call(this, initialState);
        }
        SubPage.Component = createPageComponent(SubPage);
        assign(SubPage.prototype, Page.prototype, proto);
        return SubPage;
    };
    Page.Component = require('./component/Page');
    module.exports = Page;
});