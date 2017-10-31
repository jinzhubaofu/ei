/**
 * @file create app component
 * @author leon(ludafa@outlook.com)
 */

import {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default function createAppComponent(App) {

    class AppComponent extends PureComponent {

        static propTypes = {
            routes: PropTypes.arrayOf(
                PropTypes.shape({
                    path: PropTypes.string.isRequired,
                    page: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.func
                    ]).isRequired
                })
            ),
            app: PropTypes.instanceOf(App),
            router: PropTypes.object
        };

        static childContextTypes = {
            route: PropTypes.func,
            loadPage: PropTypes.func
        };

        constructor() {

            super();

            const {routes, router, app} = this.props;

            this.app = app || new App({routes, router});

            this.state = {};

        }

        getChildContext() {

            const app = this.app;

            return {
                route(request) {
                    return app.route(request);
                },
                loadPage(pageModuleId) {
                    return app.loadPage(pageModuleId);
                }
            };

        }

        render() {
            return this.props.children;
        }
    }

    return AppComponent;

}
