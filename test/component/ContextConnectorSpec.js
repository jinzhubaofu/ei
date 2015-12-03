/**
 * @file context connector spec
 * @author Leon(leon@outlook.com)
 */

var ContextProvider = require('../../src/component/ContextProvider.js');
var ContextConnector = require('../../src/component/ContextConnector.js');
var React = require('react');
var ReactDOM = require('react-dom/server');

describe('ContextConnector', function () {

    it('should connect to context', function () {

        var View = React.createClass({

            render: function () {

                const {actionA, actionB, name} = this.props;

                expect(typeof actionA).toBe('function');
                expect(typeof actionB).toBe('function');
                expect(name).toBe('ludafa');

                return <div>{name}</div>;

            }

        });

        var context = {
            store: {
                name: 'ludafa'
            },
            dispatch: function () {
            }
        };

        var string = ReactDOM.renderToStaticMarkup(
            <ContextProvider ei={context}>
                <div>
                    <ContextConnector
                        selector={(store) => {
                            expect(store).toBe(context.store);
                            return store;
                        }}
                        actions={{
                            actionA() {

                            },
                            actionB() {

                            }
                        }}>
                        <View />
                    </ContextConnector>
                </div>
            </ContextProvider>
        );


        expect(string).toBe('<div><div>ludafa</div></div>');

    });

});
