/**
 * @file context provider spec
 * @author Leon(leon@outlook.com)
 */

var ContextProvider = require('../../lib/component/ContextProvider.js');
var React = require('react');
var ReactDOM = require('react-dom/server');

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

            render: function () {
                return React.createElement('div');
            }

        });

        var provider = React.createElement(
            ContextProvider,
            {
                ei: context
            },
            function (state, dispatch1) {

                expect(state).toBe(store);
                expect(dispatch1).toBe(dispatch);

                return React.createElement(View);
            }
        );

        var string = ReactDOM.renderToStaticMarkup(provider);


        expect(string).toBe('<div></div>');

    });

});
