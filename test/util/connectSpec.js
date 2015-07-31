/**
 * @file connect spec
 * @author Leon(leon@outlook.com)
 */

var u = require('underscore');
var React = require('react');
var Page = require('../../lib/Page.js');

var connect = require('../../lib/util/connect.js');

describe('connect', function () {


    it('is a function', function () {

        expect(u.isFunction(connect)).toBe(true);

    });

    it('will connect to the context', function () {

        var spy = jasmine.createSpy('reducer');

        var SomePage = Page.extend({

            reducer: spy,

            view: connect(
                React.createClass({

                    render: function () {

                        return React.createElement(
                            'div',
                            null,
                            this.props.name
                        );

                    }

                }),
                true
            )

        });

        var page = new SomePage({
            name: 'ludafa'
        });

        var string = page.renderToString();

        expect(string).toMatch(/<div[^>]*?>ludafa<\/div>/);


    });



});
