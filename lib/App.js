/**
 * @file ei/App
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var React = require('react');
var Router = require('./Router');
var Context = require('./Context');
var when = require('when');
var debug = require('debug')('app');
var Store = require('./Store');
var u = require('underscore');
var events = require('./events');
var env = require('./env');

function App() {
}

App.prototype.router = function (conf) {
    var router = this.router = new Router(conf);
    return router;
};

App.prototype.redirect = function () {

};

/**
 * 执行
 * @param {Request}  request  请求 在server/client上都有这个
 * @param {Response} response 响应 在client中没有这个东西
 * @return {Promise}
 */
App.prototype.execute = function (request, response) {
    var app = this;
    var context = new Context();

    context.set({
        request: request,
        response: response
    });

    return app.router
        // 先把View找到
        .route(request)
        .then(function (route) {

            debug('route found');

            // 设置当前的路由信息
            context.set('route', route);

            // 执行Action
            // 这里要生成一个action的专用上下文
            var actionContext = context.getActionContext();
            var action = route.action;

            debug('execute action');

            // 这里用when包裹一下，支持同步/异步action操作
            return when(action.execute(actionContext, request, response));
        })
        // 最后返回view
        .then(function () {
            debug('action executed successfully');
            debug('render the view...');
            var View = context.get('route').view;
            var result = {
                view: React.createElement(
                    View,
                    {
                        context: context.getViewContext()
                    }
                )
            };
            if (env.isServer) {
                debug('server need a pack');
                result.data = context.pack();
            }
            return result;
        })
};

App.prototype.config = function () {

};

App.prototype.bootstrap = function (view, pack) {

    var context = new Context();

    u.each(
        pack,
        function (data, type) {
            var StoreClass = Store.getClass(type);
            var store = context.getStore(StoreClass);
            store.unpack(data);
        }
    );

    return React.createElement(
        view,
        {
            context: context.getViewContext()
        }
    );

};

module.exports = App;
