/**
 * @file Todo
 * @author Leon(leon@outlook.com)
 */

var React = require('react');

var Todo = React.createClass({

    displayName: 'Todo',

    render: function () {

        var todo = this.props.todo;

        var state = !!todo.get('isFinished')
            ? <i className="icon icon-xuanzhong" />
            : <i className="icon icon-weixuanzhong" />;

        return (
            <div className="todo">
                <div className="state" onClick={this.toggle}>{state}</div>
                <div className="content" onClick={this.showDetail}>{todo.get('content')}</div>
            </div>
        );

    },

    toggle: function () {
        var todo = this.props.todo;
        this.props.toggle(todo.get('id'), !todo.get('isFinished'));
    },

    showDetail: function (e) {
        var todo = this.props.todo;
        this.props.showDetail(todo.get('id'));
    }

});

module.exports = Todo;
