/**
 * @file Page
 * @author leon(ludafa@outlook.com)
 */

let React = require('react');
let Promise = require('es6-promise').Promise;

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pendding: false,
            ready: false,
            error: null
        };
    }

    render() {

        let {ready, page, error} = this.state;

        let content = '';

        if (error) {
            content = error.message;
        }
        else if (ready) {
            content = page.createElement();
        }
        else {
            content = this.renderLoading();
        }

        return (
            <div className="ui-page">
                {content}
            </div>
        );

    }

    renderLoading() {
        return <span>loading...</span>;
    }

    componentDidMount() {

        let {initialState, request} = this.props;
        let {app} = this.context;

        this.renderPage(app, request, initialState);

    }

    renderPage(app, request, initialState) {

        let currentPage = this.state.page;

        this.setState({
            pendding: true,
            error: null
        });

        let route = app.route(request);

        if (!route) {
            this.setState({
                ready: false,
                error: {
                    status: 404
                },
                pendding: false,
                page: null
            });
            return;
        }

        app
            .loadPage(route.page)
            .then((Page) => {

                let page;

                if (currentPage && currentPage instanceof Page) {
                    page = currentPage;
                }
                else {
                    page = new Page();

                    // 添加事件代理
                    page.on('*', () => {

                        let eventName = page.getCurrentEvent()
                            .split(/[\-_]/)
                            .map(function (term) {
                                return term.charAt(0).toUpperCase() + term.slice(1).toLowerCase();
                            })
                            .join('');

                        let handlerName = `on${eventName}`;

                        let handler = this.props[handlerName];

                        if (typeof handler === 'function') {
                            handler.apply(null, arguments);
                        }

                    });

                }

                page.route = route;

                return page;

            })
            .then(function (page) {

                if (initialState) {
                    page.setState(initialState);
                    return page;
                }

                return Promise
                    .resolve(page.getInitialState(request))
                    .then(function (state) {
                        page.init(state);
                        return page;
                    });

            })
            .then((page) => {

                if (currentPage && currentPage !== page) {
                    currentPage.dispose();
                }

                this.setState({
                    page: page,
                    ready: true,
                    pendding: false,
                    error: null
                });

            })
            .catch((error) => {
                this.setState({
                    error: error,
                    ready: false,
                    pendding: false,
                    page: null
                });
            });

    }

    componentWillReceiveProps(nextProps) {

        let {request} = this.props;
        let nextRequest = nextProps.request;

        if (
            request.pathname !== nextRequest.pathname
            || request.search !== nextRequest.search
        ) {
            this.renderPage(this.context.app, nextRequest, null);
        }

    }

    componentWillUnmount() {

        let {page} = this.state;

        if (page) {
            page.dispose();
        }

    }

}

let {PropTypes} = React;

Page.contextTypes = {
    app: PropTypes.object.isRequired
};

Page.propTypes = {
    request: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        query: PropTypes.object,
        search: PropTypes.string
    }).isRequired,
    initialState: PropTypes.any
};

module.exports = Page;
