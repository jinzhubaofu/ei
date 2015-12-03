/**
 * @file Page spec
 * @author Leon(leon@outlook.com)
 */

var u = require('underscore');
var React = require('react');
var connect = require('../src/util/connect');

var Page = require('../src/Page.js');


describe('Page', function () {


    it('have a static method `extend`', function () {

        expect(u.isFunction(Page.extend)).toBe(true);

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

                reducer: function () {

                },

                view: function () {

                }

            });

        }).not.toThrow();


    });

    it('`extend` will create a new sub class of Page', function () {

        var SomePage = Page.extend({

            reducer: function () {

            },

            view: function () {

            }

        });

        expect(u.isFunction(SomePage)).toBe(true);

    });

    it('`dispatch` an action will trigger the reducer to run', function () {

        var spy = jasmine.createSpy('reducer');

        var SomePage = Page.extend({

            reducer: spy,

            view: function () {

            }

        });

        var page = new SomePage();

        page.dispatch({type: 'add'});

        expect(spy).toHaveBeenCalled();

    });
    // TODO: 补充新的render测试
    // it('`renderToString`', function () {

    //     var spy = jasmine.createSpy('reducer');

    //     var SomePage = Page.extend({

    //         reducer: spy,

    //         view: connect(
    //             React.createClass({

    //                 render: function () {

    //                     expect(u.isFunction(this.props.add)).toBe(true);

    //                     return React.createElement(
    //                         'div',
    //                         null,
    //                         this.props.name
    //                     );

    //                 }

    //             }),
    //             true,
    //             {
    //                 add: function () {
    //                     return {
    //                         type: 'add'
    //                     };
    //                 }
    //             }
    //         )

    //     });

    //     var page = new SomePage({

    //         name: 'ludafa'

    //     });

    //     var string = page.renderToString();

    //     expect(string).toMatch(/<div[^>]*?>ludafa<\/div>/);


    // });


});
