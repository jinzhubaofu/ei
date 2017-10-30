/**
 * @file create a component class for Page
 * @author leon(ludafa@outlook.com)
 */

import React, {PureComponent} from 'react';
import guid from '../util/guid';
import PropTypes from 'prop-types';

const PAGE_GET_INITIAL_STATE_GUID_ATTR = 'PAGE_GET_INITIAL_STATE_GUID_ATTR';
const hasOwn = Object.prototype.hasOwnProperty;

export default function createPageComponent(Page) {

    class PageComponent extends PureComponent {

        static displayName = 'PageComponent';

        constructor() {

            super();

            const {initialState} = this.props;

            const page = this.page = new Page(initialState);

            // 添加事件代理
            page.on('*', (...args) => {

                const eventName = page.getCurrentEvent()
                    .split(/[\-_]/)
                    .map(term => term.charAt(0).toUpperCase() + term.slice(1).toLowerCase())
                    .join('');

                const handler = this.props[`on${eventName}`];

                if (typeof handler === 'function') {
                    handler.apply(this, args);
                }

            });

            this.state = {
                stage: initialState == null ? 'INITED' : 'LOADED',
                error: null
            };

        }

        componentDidMount() {

            const {handleRequest, page, props} = this;
            const stage = this.state.stage;

            if (stage === 'LOADED') {
                return;
            }

            handleRequest(page, props.request);

        }


        componentWillReceiveProps(nextProps) {

            const request = this.props.request;
            const nextRequest = nextProps.request;

            if (request !== nextRequest) {
                this.handleRequest(this.page, nextRequest);
            }

        }

        componentWillUnmount() {
            const page = this.page;
            if (page) {
                page.dispose();
            }
            this.page = null;
        }

        handleRequest(page, request) {

            // 我们使用一个不会重复的 token 来完成 promise abort 的处理
            // 每次我们发起异步请求时都会生成一个唯一的 token
            // 当异步请求完成时会检查 token 是否还是一致的
            // 如果不是一致的（也就是在这次请求之后又发生了一次请求，token 就更新了），就算球了
            const token = this[PAGE_GET_INITIAL_STATE_GUID_ATTR] = guid();

            this.setState({
                stage: 'LOADING',
                error: null
            });

            Promise.resolve(page.getInitialState(request))
                .then(state => {

                    page.init(state);

                    // 如果不是一致的（也就是在这次请求之后又发生了一次请求，token 就更新了），就算球了！
                    if (token === this[PAGE_GET_INITIAL_STATE_GUID_ATTR]) {
                        this.setState({
                            stage: 'LOADED'
                        });
                    }

                }, error => {

                    // 如果不是一致的（也就是在这次请求之后又发生了一次请求，token 就更新了），就算球了~
                    if (token === this[PAGE_GET_INITIAL_STATE_GUID_ATTR]) {
                        this.setState({
                            error,
                            stage: 'LOADED'
                        });
                    }

                });
        }

        render() {

            const {page, props} = this;
            const {error, stage} = this.state;

            const {
                renderLoadingMessage,
                renderErrorMessage
            } = props;

            if (error) {
                return renderErrorMessage(error);
            }

            return stage === 'LOADED'
                ? page.createElement(getCustomProps(props))
                : renderLoadingMessage();

        }

    }

    PageComponent.propTypes = {
        initialState: PropTypes.object,
        request: PropTypes.object,
        renderLoadingMessage: PropTypes.func,
        renderErrorMessage: PropTypes.func
    };

    PageComponent.defaultProps = {
        initialState: null,
        request: {},
        renderLoadingMessage() {
            return (
                <div>loading...</div>
            );
        },
        renderErrorMessage(error) {
            return (
                <div>{error.message}</div>
            );
        }
    };

    function getCustomProps(props) {

        const result = {};

        /* eslint-disable fecs-use-for-of */
        for (const name in props) {
            if (hasOwn.call(props, name) && !(name in PageComponent.propTypes)) {
                result[name] = props[name];
            }
        }
        /* eslint-enable fecs-use-for-of */

        return result;

    }

    return PageComponent;

}
