/**
 * @file StoreContext
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

function StoreContext(context) {
    this.context = context;
}

StoreContext.prototype.get = function () {
    var context = this.context;
    return context.get.apply(context, arguments);
};

StoreContext.prototype.set = function () {
    var context = this.context;
    return context.set.apply(context, arguments);
};

StoreContext.prototype.listenToAction = function (actionName, handler) {
    console.log('nimei');
};

module.exports = StoreContext;
