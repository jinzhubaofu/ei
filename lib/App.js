/**
 * @file ei/App
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var React = require('react');
var Router = require('./Router');
var Context = require('./Context');
var ContextView = require('./ContextView');
var u = require('underscore');

function App(options) {
}

App.prototype.router = function (conf) {
    var router = this.router = new Router(conf);
    return router;
};

/**
 * 执行
 * @param {Request} request   请求
 * @param {Response} response 响应
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
            // 设置当前的路由信息
            context.set('route', route);
            // 执行Action
            // 这里要生成一个action的专用上下文
            return route.action(context.getActionContext());
        })
        // 最后返回view
        .then(function () {
            return app.render(context);
        });
};


App.prototype.render = function (context) {
    var route = context.get('route');
    var Component = route.view;
    var viewContext = context.getViewContext();
    var component = React.createElement(
        Component,
        {
            className: 'test',
            context: viewContext
        }
    );
    return React.renderToString(component);
};

App.prototype.config = function () {

};

module.exports = App;
