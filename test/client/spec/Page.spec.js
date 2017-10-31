/**
 * @file Page spec
 * @author Leon(leon@outlook.com)
 */

import Page from '../../../src/Page.js';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mount} from 'enzyme';

describe('Page', function () {

    it('is a `Class`', () => {
        expect(typeof Page === 'function' && Page.prototype.constructor === Page).toBe(true);
    });

    it('can be `extends`', () => {

        let INITIAL_STATE = {
            message: 'hello world'
        };

        let View = props => (<div>{props.message}</div>);
        let middleware = page => store => next => action => {
            console.log(action);
            return next(action);
        };

        class MyPage extends Page {
            static view = View;
            static reducer = (state = INITIAL_STATE, action) => state;
            static middlewares = [
                middleware
            ]
        }

        let page = new MyPage();

        expect(page.context.getState()).toEqual(INITIAL_STATE);
        expect(page.middlewares.length).toBe(2);
        let wrapper = page.createElement();
        expect(wrapper.props.store).toBe(page.context);
        expect(wrapper.props.children.type).toBe(View);

    });

    it('have a static method `extend`', function () {
        expect(typeof (Page.extend) === 'function').toBe(true);
    });

    it('`extend` need a options with reducer and view', function () {

        expect(function () {

            Page.extend();

        }).toThrow();

        expect(function () {

            Page.extend({


            });

        }).toThrow();

        expect(function () {

            Page.extend({

                reducer() {

                },

                view() {

                }

            });

        }).not.toThrow();


    });

    it('`extend` will create a new sub class of Page', function () {

        let SomePage = Page.extend({

            reducer() {

            },

            view() {

            }

        });

        expect(typeof (SomePage) === 'function').toBe(true);
        expect(new SomePage().middlewares.length).toBe(1);

    });

    it('`merge middlewares`', () => {

        let testAction = {
            type: 'test'
        };

        let middleware = page => store => next => action => {
            expect(action).toBe(testAction);
            expect(page).toBe(page);
            return next(action);
        };

        let MyPage = Page.extend({

            reducer() {

            },

            view() {

            },

            middlewares: [middleware]

        });

        let page = new MyPage();

        expect(page.middlewares.length).toBe(2);
        expect(page.middlewares[1]).toBe(middleware);
        page.dispatch(testAction);

    });

    it('`combineReducers` will auto added', () => {

        let SomePage = Page.extend({

            reducer: {
                form(state = {name: 'test'}, action) {
                    return state;
                }
            },

            view() {

            }

        });

        let page = new SomePage();

        expect(page.context.getState()).toEqual({
            form: {
                name: 'test'
            }
        });

    });

    it('`getState`', () => {

        let SomePage = Page.extend({

            reducer(state, action) {
                return state;
            },

            view() {

            }

        });

        let page = new SomePage({name: 'test'});

        expect(page.getState()).toEqual({name: 'test'});

    });

    it('`setState`', () => {

        let SomePage = Page.extend({

            reducer(state, action) {
                return state;
            },

            view() {

            }

        });

        let page = new SomePage({name: 'test'});

        expect(page.context.getState()).toEqual({name: 'test'});

        page.setState({text: 'haha'});

        expect(page.context.getState()).toEqual({text: 'haha'});

    });

    it('`dispatch` an action will trigger the reducer to run', function () {

        let spy = jasmine.createSpy('reducer');

        let SomePage = Page.extend({

            reducer: spy,

            view() {

            }

        });

        let page = new SomePage();

        page.dispatch({type: 'add'});

        expect(spy).toHaveBeenCalled();

    });

    it('`createElement`', function () {

        class View extends Component {
            render() {
                let add = this.props.add;
                expect(typeof (add) === 'function').toBe(true);
                return (
                    <div onClick={() => add()}>
                        {this.props.name}
                    </div>
                );
            }
        }

        let SomePage = Page.extend({

            reducer(state = {}, {type, payload}) {

                switch (type) {
                    case 'test':
                        return {
                            ...state,
                            name: payload
                        };
                    case 'test2':
                        return {
                            ...state,
                            name: payload
                        };
                    default:
                        return state;
                }

            },

            view: connect(
                state => state,
                {
                    add() {
                        return {
                            type: 'test2',
                            payload: 'test2'
                        };
                    }
                }
            )(View)

        });

        let page = new SomePage({
            name: 'ludafa'
        });

        let wrapper = mount(page.createElement());

        expect(wrapper.prop('store')).toBe(page.context);
        expect(wrapper.find('div').length).toBe(1);
        expect(wrapper.find('div').text()).toBe('ludafa');

        page.dispatch({
            type: 'test',
            payload: 'test'
        });

        expect(wrapper.find('div').text()).toBe('test');

        wrapper.find('div').simulate('click');

        expect(wrapper.find('div').text()).toBe('test2');

    });


});
