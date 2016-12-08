/**
 * @file context provider spec
 * @author Leon(leon@outlook.com)
 */

const ContextProvider = require('../../../../src/component/ContextProvider.js');
const React = require('react');
const ReactDOM = require('react-dom/server');
const PropTypes = React.PropTypes;

describe('ContextProvider', function () {

    it('is a React Component', function () {

        const store = {};

        function dispatch() {

        }

        const context = {
            store,
            dispatch
        };

        const View = React.createClass({

            contextTypes: {
                store: PropTypes.object.isRequired
            },

            render() {

                expect(typeof this.context.store).toBe('object');

                const {dispatch, store} = this.context.store;

                expect(typeof dispatch).toBe('function');
                expect(typeof store).toBe('object');

                return React.createElement('div');
            }

        });

        const provider = React.createElement(
            ContextProvider,
            {
                store: context
            },
            React.createElement(View)
            // function (state, dispatch1) {

            //     expect(state).toBe(store);
            //     expect(dispatch1).toBe(dispatch);

            //     return React.createElement(View);
            // }
        );

        const string = ReactDOM.renderToStaticMarkup(provider);


        expect(string).toBe('<div></div>');

    });

});
