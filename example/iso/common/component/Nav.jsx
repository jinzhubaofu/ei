/**
 * @file Nav
 * @author Leon(leon@outlook.com)
 */

var React = require('react');


var Nav = React.createClass({

    render: function() {
        return (
            <nav className="nav">
                <div className="left button" onClick={this.props.onLeft} >
                    {this.props.leftOperation}
                </div>
                <h3 className="title">{this.props.title}</h3>
                <div className="right button" onClick={this.props.onRight}>
                    {this.props.rightOperation}
                </div>
            </nav>
        );
    }

});

module.exports = Nav;
