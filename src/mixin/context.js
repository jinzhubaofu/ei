define(require, exports, module) {
/**
 * @file ei/mixin/Context
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var React = require('react');
var u = require('underscore');


var base = {
    componentDidMount: function () {
        u.each(
            this.storeListeners || {},
            function (Stores, handlerName) {
                u.each(
                    [].concat(Stores),
                    function (Store) {
                        this.addStoreListener(Store, this[handlerName]);
                    },
                    this
                );
            },
            this
        );
    },
    componentWillUnmount: function () {
        u.each(
            this.storeListeners || {},
            function (Stores, handlerName) {
                u.each(
                    [].concat(Stores),
                    function (Store) {
                        this.removeStoreListener(Store, this[handlerName]);
                    },
                    this
                );
            },
            this
        );
    },
    addStoreListener: function (Store, handler) {
        this.getStore(Store).addListener(handler);
        return this;
    },
    removeStoreListener: function (Store, handler) {
        this.getStore(Store).removeListener(handler);
        return this;
    }
};

var types = {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
};


exports.context = u.extend(
    {},
    base,
    {
        propsTypes: {
            context: React.PropTypes.object.isRequired
        },
        childContextTypes: types,
        getChildContext: function () {
            return this.props.context;
        },
        getStore: function (Store) {
            return this.props.context.getStore(Store);
        },
        execute: function () {
            var context = this.props.context;
            return context.executeAction.apply(context, arguments);
        }
    }
);

exports.incontext = u.extend(
    {},
    base,
    {
        contextTypes: types,
        getStore: function (Store) {
            return this.context.getStore(Store);
        },
        execute: function () {
            var context = this.context;
            return context.executeAction.apply(context, arguments);
        }
    }
);

});