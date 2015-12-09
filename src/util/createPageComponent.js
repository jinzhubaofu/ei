/**
 * @file create a component class for Page
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');

const {PropTypes} = React;

function createPageComponent(Page) {

    const PageComponent = React.createClass({

        displayName: `PageComponent`,

        getInitialState() {

            const {props, context} = this;
            const {initialState} = props;
            const {addJob, getParentJob} = context;

            const page = this.page = new Page(initialState);

            const job = addJob(page, getParentJob());

            return {
                ready: false,
                job
            };

        },

        getChildContext() {

            return {
                getParentJob: () => {
                    return this.page;
                }
            };

        },

        render() {

            return (
                <noscript />
            );

        }

    });

    PageComponent.contextTypes = {
        addJob: PropTypes.func,
        getParentJob: PropTypes.func
    };

    PageComponent.childContextTypes = {
        getParentJob: PropTypes.func
    };

    PageComponent.propTypes = {
        initialState: PropTypes.object
    };

    PageComponent.defaultProps = {
        initialState: null
    };

    return PageComponent;

}

module.exports = createPageComponent;
