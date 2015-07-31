/**
 * @file App jsx
 * @author Leon(leon@outlook.com)
 */

var React = require('react');
var u = require('underscore');

var locator = require('../../../../../lib/locator');
var connect = require('../../../../../lib/util/connect');

var Todo = require('./Todo.jsx');
var Nav = require('../../common/component/Nav.jsx');


var App = React.createClass({

    render: function() {

        return (
            <div>
                <Nav
                    title="todo"
                    rightOperation={<i className="icon icon-add" />}
                    onRight={this.add} />
                <section className="todo-list">
                    {this.props.list.map(this.renderItem)}
                </section>
            </div>
        );

    },

    renderItem: function (todo) {

        return (
            <Todo
                todo={todo}
                key={todo.get('id')}
                toggle={this.props.toggle}
                showDetail={this.showDetail} />
        );

    },

    showDetail: function (id) {

        locator.redirect('/detail', {
            id: id
        });

    },

    add: function () {
        locator.redirect('/add');
    }

});

module.exports = connect(
    App,
    true,
    {
        toggle: require('../../common/action/toggle')
    }
);
