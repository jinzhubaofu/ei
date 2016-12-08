/**
 * @file context connector spec
 * @author Leon(leon@outlook.com)
 */

const ContextProvider = require('../../../../src/component/ContextProvider.js');
const ContextConnector = require('../../../../src/component/ContextConnector.js');
const React = require('react');
const ReactDOM = require('react-dom/server');

describe('ContextConnector', function () {

    it('should connect to context', function () {

        const View = React.createClass({

            render() {

                const {actionA, actionB, name} = this.props;

                expect(typeof actionA).toBe('function');
                expect(typeof actionB).toBe('function');
                expect(name).toBe('ludafa');

                return <div>{name}</div>;

            }

        });

        const context = {
            store: {
                name: 'ludafa'
            },
            dispatch() {
            }
        };

        const string = ReactDOM.renderToStaticMarkup(
            <ContextProvider store={context}>
                <div>
                    <ContextConnector
                        selector={store => {
                            expect(store).toBe(context.store);
                            return store;
                        }}
                        actions={{
                            actionA() {

                            },
                            actionB() {

                            }
                        }}
                        originProps={{}}
                        originComponent={View}>
                    </ContextConnector>
                </div>
            </ContextProvider>
        );

        expect(string).toBe('<div><div>ludafa</div></div>');

    });

});
