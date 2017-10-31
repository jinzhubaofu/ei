/**
 * @file 页面
 * @author Leon(leon@outlook.com)
 *
 * @requires react
 */

import React from 'react';
import assign from './util/assign';
import {REPLACE, replace} from './actionCreator/page';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import invariant from './util/invariant';
import guid from './util/guid';
import events from './events';
import {init} from './actionCreator/page';
import Emitter from './Emitter';
import PageComponent from './component/Page';
import pageActionEventProxy from './middleware/pageActionEventProxy';
import createPageComponent from './util/createPageComponent';
import * as env from './env';

export default class Page extends Emitter {

    /**
     * 生成Page子类
     *
     * @param {!Object} proto 扩展Page的配置
     * @return {Function}
     */
    static extend = function (proto) {

        invariant(proto, 'create Page need options');

        invariant(proto.reducer, 'Pager must have a reducer');

        invariant(proto.view, 'Pager must have a view');

        /**
         * SubPage
         *
         * @class
         * @param {*} initialState 脱水状态
         */
        class SubPage extends Page {
        }

        assign(SubPage.prototype, proto);

        SubPage.Component = createPageComponent(SubPage);

        return SubPage;

    };

    static Component = PageComponent;

    /**
     * 页面
     *
     * @constructor
     * @param {*} initialState 初始数据状态
     */
    constructor(initialState) {
        super();
        this.middlewares = [
            pageActionEventProxy
        ];
        this.initialize(initialState);
    }

    /**
     * 构造函数
     *
     * @param {*} initialState 初始数据
     */
    initialize(initialState) {

        this.id = guid();

        let reducer = this.reducer || this.constructor.reducer;

        if (typeof reducer === 'object') {
            reducer = combineReducers(this.reducer);
        }

        let enhancer = compose;

        if (
            process.env.NODE_ENV !== 'production'
            && env.isClient
            && window
            && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ) {
            enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                name: `ei-page@${this.id}`
            });
        }

        this.context = createStore(
            (state, action) => {
                if (action.type === REPLACE) {
                    return action.payload;
                }
                return reducer(state, action);
            },
            initialState,
            enhancer(
                applyMiddleware(
                    ...this.middlewares.map(middleware => middleware(this))
                )
            )
        );

    }

    /**
     * 初始化
     *
     * 此方法只会被调用一次
     *
     * 处理请求的过程中，在页面实例化后，会被调用到此方法
     *
     * 此方法会派发一个init动作，并附带有getInitialState方法所返回的数据
     *
     * init动作提供给页面的初始数据剪裁的时机
     *
     * 但是只有在execute的情况下才会被调用，
     * 我们在bootstrap时传入的initialState是已经是剪裁好的数据
     * 也就是在server端预渲染后向client端同步数据状态的场景
     *
     *
     * @TODO 通过page的stage来保证此动作只能触发一次
     *
     * @public
     * @param {*} initialState 初始状态
     * @return {module:Page}
     */
    init(initialState) {
        this.dispatch(init(initialState));
        return this;
    }

    /**
     * 使用当前上下文中的数据，创建一个可提渲染使用的react元素
     *
     * @public
     *
     * @param {?Object} props 视图属性
     * @notice 此参数一般不需要使用，只有在 Page 作为子组件时使用
     * @return {ReactElement}
     */
    createElement(props) {

        const context = this.context;
        const View = this.view || this.constructor.view;

        return (
            <Provider store={context}>
                <View {...props} />
            </Provider>
        );

    }

    /**
     * 返回当前上下文中的所有数据
     *
     * 此方法用于将服务器端的页面数据，同步到客户端上
     *
     * @public
     *
     * @return {*}
     */
    getState() {
        return this.context.getState();
    }

    /**
     * 设置当前上下文中的所有数据
     *
     * @param {*} state 数据
     * @return {module:Page}
     */
    setState(state) {
        this.context.dispatch(replace(state));
        return this;
    }

    /**
     * 派发一个动作，激活相应的数据剪切和视图更新
     *
     * @public
     *
     * @method module:Page#dispatch
     *
     * @param {(Object | Function)} action 动作
     *
     * @return {Object}
     *
     * @fires module:events~page-dispatch
     */
    dispatch(action) {

        /**
         * @event module:events~page-dispatch
         * @param {(Object | Function)} action 动作
         */
        events.emit('page-dispatch', action);

        this.emit('dispatch', action);

        this.context.dispatch(action);

        return action;

    }

    /**
     * 获取页面初始数据
     *
     * 页面在启动时，一般都会需要通过操作资源来获取数据作为初始数据
     *
     * 并且，这个过程一般还需要使用当前`请求`来完成决策
     *
     * 在app中接收到请求后会加载路由中指定的Page模块，将其实例化后，执行此方法
     *
     * @todo page需要有一个状态标识，new / inited / rendered / disposed
     *
     * @public
     *
     * @param {Object} request 请求
     *
     * @return {Promise}
     */
    getInitialState(request) {
        return {};
    }

    /**
     * 销毁页面
     *
     * @return {module:Page}
     */
    dispose() {

        /**
         * @event module:event~page-dispose
         */
        events.emit('page-dispose');

        this.emit('dispose');

        // @TODO 补充销毁时的必要处理

        return this;
    }

}
