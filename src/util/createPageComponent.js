/**
 * @file create a component class for Page
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const guid = require('../util/guid');
const {PropTypes} = React;
const PAGE_GET_INITIAL_STATE_GUID_ATTR = 'PAGE_GET_INITIAL_STATE_GUID_ATTR';

const hasOwn = Object.prototype.hasOwnProperty;

function createPageComponent(Page) {

    function getCustomProps(props) {

        const result = {};

        for (const name in props) {
            if (hasOwn.call(props, name) && !(name in PageComponent.propTypes)) {
                result[name] = props[name];
            }
        }

        return result;

    }

    const PageComponent = React.createClass({

        displayName: 'PageComponent',

        getInitialState() {

            const me = this;
            const {props} = me;
            const {initialState} = props;

            const page = me.page = new Page(initialState);

            // 添加事件代理
            page.on('*', function () {

                const eventName = page.getCurrentEvent()
                    .split(/[\-_]/)
                    .map(term => {
                        return term.charAt(0).toUpperCase() + term.slice(1).toLowerCase();
                    })
                    .join('');

                const handler = props[`on${eventName}`];

                if (typeof handler === 'function') {
                    handler.apply(me, arguments);
                }

            });

            return {
                stage: initialState == null ? 'INITED' : 'LOADED',
                error: null
            };

        },

        componentDidMount() {

            const {handleRequest, page, props} = this;
            const {stage} = this.state;

            if (stage === 'LOADED') {
                return;
            }

            handleRequest(page, props.request);

        },


        componentWillReceiveProps(nextProps) {

            const {request} = this.props;
            const nextRequest = nextProps.request;

            if (request !== nextRequest) {
                this.handleRequest(this.page, nextRequest);
            }

        },

        componentWillUnmount() {
            const {page} = this;
            if (page) {
                this.page.dispose();
                this.page = null;
            }
        },

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
        },

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

    });

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

    return PageComponent;

}

module.exports = createPageComponent;
