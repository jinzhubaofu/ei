/**
 * @file context provider spec
 * @author Leon(leon@outlook.com)
 */

const ContextProvider = require('../../src/component/ContextProvider.js');
const React = require('react');
const ReactDOM = require('react-dom/server');
const PropTypes = React.PropTypes;
const Context = require('../../src/Context.js');
const expect = require('expect');

describe('ContextProvider', function () {

    it('is a React Component', function () {

        var store = {};

        function dispatch() {

        }

        var context = {
            store: store,
            dispatch: dispatch
        };

        var View = React.createClass({

            contextTypes: {
                ei: PropTypes.object.isRequired
            },

            render: function () {

                expect(typeof this.context.ei).toBe('object');

                const {ei} = this.context;
                const {dispatch, store} = ei;

                expect(typeof dispatch).toBe('function');
                expect(typeof store).toBe('object');

                return React.createElement('div');
            }

        });

        var provider = React.createElement(
            ContextProvider,
            {
                ei: context
            },
            React.createElement(View)
            // function (state, dispatch1) {

            //     expect(state).toBe(store);
            //     expect(dispatch1).toBe(dispatch);

            //     return React.createElement(View);
            // }
        );

        var string = ReactDOM.renderToStaticMarkup(provider);


        expect(string).toBe('<div></div>');

    });

});
