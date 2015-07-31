/**
 * @file context connector spec
 * @author Leon(leon@outlook.com)
 */

var ConextProvider = require('../../lib/component/ConextProvider.js');
var ContextConnector = require('../../lib/component/ContextConnector.js');
var React = require('react');

describe('ContextConnector', function () {

    it('should connect to context', function () {

        var View = React.createClass({

            render: function () {
                return React.createElement(
                    ContextConnector,
                    {
                        select: function (store) {
                            return store;
                        }
                    },
                    function (state, dispatch) {
                        return React.createElement('div', null, state.name);
                    }
                );
            }

        });

        var context = {
            store: {
                name: 'ludafa'
            },
            dispatch: function () {

            }
        };

        var provider = React.createElement(
            ConextProvider,
            {
                ei: context
            },
            function () {
                return React.createElement(View);
            }
        );

        var string = React.renderToStaticMarkup(provider);


        expect(string).toBe('<div>ludafa</div>');

    });

});
