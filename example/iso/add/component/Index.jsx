/**
 * @file add todo index
 * @author Leon(leon@outlook.com)
 */

var React = require('react');

var connect = require('../../../../../../lib/util/connect');
var Resource = require('../../../../../../lib/resource');
var locator = require('../../../../../../lib/locator');

var Nav = require('../../common/component/Nav.jsx');

var Index = React.createClass({

    render: function() {

        return (
            <div className="add-page">
                <Nav
                    title="new todo"
                    leftOperation={<i className="icon icon-back" />}
                    onLeft={this.back} />
                <section>
                    <textarea
                        value={this.props.content}
                        onChange={this.onContentChange}
                        placeholder="new todo..." />
                    <button onClick={this.onSubmit}>ok</button>
                </section>
            </div>
        );

    },

    back: function () {
        locator.redirect('/list');
    },

    onContentChange: function (e) {
        this.props.updateContent(e.target.value);
    },

    onSubmit: function () {
        this.props.submit(this.props.content)
    }

});

module.exports = connect(
    Index,
    true,
    {
        updateContent: function (content) {

            return {
                type: 'ADD_UPDATE_CONTENT',
                content: content
            };

        },

        submit: function (content) {

            return function (dispatch) {

                Resource
                    .get('todo')
                    .add(content)
                    .then(function (todo) {

                        locator.redirect('/detail', {
                            id: todo.id
                        });

                    });


            };

        }
    }
);
