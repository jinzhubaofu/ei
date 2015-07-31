/**
 * @file todo
 * @author Leon(leon@outlook.com)
 */


var React = require('react');

var todoResource = require('../../../../../../lib/resource').get('todo');

var locator = require('../../../../../../lib/locator');
var connect = require('../../../../../../lib/connect');

var Nav = require('../../common/component/Nav.jsx');

var TodoDetail = React.createClass({

    render: function() {

        var todo = this.props.todo;

        var state = !!todo.get('isFinished')
            ? <i className="icon icon-xuanzhong" />
            : <i className="icon icon-weixuanzhong" />;

        var isUploading = todo.get('isUpdating');

        var content = todo.get('content');

        return (
            <div className="detail-page">
                <Nav
                    title="Detail"
                    leftOperation={<i className="icon icon-back" />}
                    rightOperation={state}
                    onLeft={this.back}
                    onRight={this.toggle} />
                <section>
                    <div className="content">
                        <textarea
                            disabled={isUploading}
                            value={content}
                            onChange={this.changeContent} />
                        <button
                            disabled={isUploading || !content}
                            onClick={this.update}>
                            {isUploading ? 'updating' : 'update'}
                        </button>
                    </div>
                    <footer>
                        <h4>create time</h4>
                        <p>{new Date(+todo.get('createTime')).toString()}</p>
                        <h4>update time</h4>
                        <p>{new Date(+todo.get('updateTime')).toString()}</p>
                    </footer>
                </section>
            </div>
        );

    },

    back: function () {
        locator.redirect('/list');
    },

    toggle: function () {
        this.props.toggle(
            this.props.todo.get('id'),
            !+this.props.todo.get('isFinished')
        );
    },

    changeContent: function (e) {
        this.props.changeContent(e.target.value);
    },

    update: function () {

        var props = this.props;
        var todo = props.todo;

        props.updateContent(todo.get('id'), todo.get('content'));

    }

});

module.exports = connect(
    TodoDetail,
    true,
    {
        toggle: require('../../common/action/toggle'),
        changeContent: function (content) {
            return {
                type: 'TODO_CHANGE_CONTENT',
                content: content
            };
        },
        updateContent: require('../../common/action/updateContent')
    }
);




