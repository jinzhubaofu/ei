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

function App(options) {
}

App.prototype.router = function (conf) {
    var router = this.router = new Router(conf);
    return router;
};

/**
 * 执行
 * @param {Request}  request   请求 在server/client上都有这个
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
            return when(action.execute(actionContext));
        })
        // 最后返回view
        .then(function () {
            debug('action executed successfully');
            debug('render the view...');
            var html = React.renderToString(
                React.createElement(
                    context.get('route').view,
                    {
                        context: context.getViewContext()
                    }
                )
            );
            var data = context.pack();
            return {
                html: html,
                data: data
            };
        });
};

App.prototype.config = function () {

};

module.exports = App;
