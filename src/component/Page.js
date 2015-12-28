/**
 * @file 可进行路由的 Page
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const guid = require('../util/guid');
const ASYNC_PAGE_LOAD_ATTR = 'ASYNC_PAGE_LOAD_ATTR';

const Page = React.createClass({

    displayName: 'Page',

    getInitialState() {
        return {
            pendding: false,
            ready: false,
            error: null
        };
    },

    componentDidMount() {

        let {initialState, request} = this.props;

        this.renderPage(request, initialState);

    },

    componentWillReceiveProps(nextProps) {

        const {request = {}} = this.props;
        const {pathname, search} = request;
        const nextRequest = nextProps.request;

        if (
            request !== nextRequest
            && (pathname !== nextRequest.pathname || search !== nextRequest.search)
        ) {
            this.renderPage(nextRequest, null);
        }

    },

    renderPage(request, initialState) {

        const route = this.context.route(request);

        if (!route) {

            this.setState({
                ready: false,
                error: {
                    status: 404,
                    message: '啊哦，这个页面迷失在了茫茫宇宙中。。。'
                },
                pendding: false,
                Page: null
            });

            return;
        }

        this.setState({
            pendding: true,
            error: null,
            ready: false
        });

        const token = this[ASYNC_PAGE_LOAD_ATTR] = guid();

        this
            .context
            .loadPage(route.page)
            .then((Page) => {

                // 对照 token
                // 如果 token 未变化，才能进行渲染
                // 如果 token 已发生变化 ，那么吞掉渲染
                if (token === this[ASYNC_PAGE_LOAD_ATTR]) {
                    this.setState({
                        Page,
                        error: null,
                        pendding: false,
                        ready: true
                    });
                }

            })
            ['catch']((error) => {

                // 对照 token
                // 如果 token 未变化，才能进行渲染
                // 如果 token 已发生变化 ，那么吞掉渲染
                if (token === this[ASYNC_PAGE_LOAD_ATTR]) {
                    this.setState({
                        error: error,
                        ready: false,
                        pendding: false,
                        Page: null
                    });
                }

            });

    },

    onRedirect(action) {

        const {onRedirect} = this.props;

        if (onRedirect) {
            onRedirect(action);
            return;
        }

        this.renderPage(action.payload.location);

    },

    render() {

        const {
            request,
            renderLoadingMessage,
            renderErrorMessage,
            ...rest
        } = this.props;

        const {ready, pendding, Page, error} = this.state;

        let content = null;

        // 如果 request 是空的，那么我们认为它相当于 iframe src="about:blank"
        if (request != null) {
            if (error) {
                content = renderErrorMessage(error);
            }
            else if (pendding) {
                content = renderLoadingMessage();
            }
            else if (ready) {
                try {
                    content = (
                        <Page.Component
                            {...rest}
                            onRedirect={this.onRedirect}
                            request={request} />
                    );
                }
                catch (e) {
                    content = renderErrorMessage(e);
                }
            }
        }

        return (
            <div className="ui-page">
                {content}
            </div>
        );

    }

});

const {PropTypes} = React;

Page.contextTypes = {
    route: PropTypes.func,
    loadPage: PropTypes.func
};

Page.propTypes = {
    request: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        query: PropTypes.object,
        search: PropTypes.string
    }),
    initialState: PropTypes.any,
    renderLoadingMessage: PropTypes.func,
    renderErrorMessage: PropTypes.func
};

Page.defaultProps = {

    renderErrorMessage(error) {
        return (
            <span>{error.message}</span>
        );
    },

    renderLoadingMessage() {
        return (<span>loading...</span>);
    }

};

module.exports = Page;
