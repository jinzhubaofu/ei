/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file ei.Middleware
* @author leon <ludafa@outlook.com>
*/

/**
 * 生成dispatch调用栈函数
 *
 * 生成一个新函数，执行这个新函数会依次调用中间件函数，并且给每个中间件函数提供三个参数：
 * 1. 当前上下文中的所有数据
 * 2. 当前被派发的动作
 * 3. 下一个中间件函数
 *
 * @param  {module:Context}   context     上下文
 * @param  {?Array.<Function>} middlewares 一个中间件函数数组
 * @return {Function}
 */
function composeMiddleware(context, middlewares = []) {

    return middlewares
        .reduceRight(
            function (next, middleware, index) {
                return function (action) {
                    return middleware(context.getState(), action, next);
                };
            },
            context.dispatch.bind(context)
        );

}

module.exports = composeMiddleware;
