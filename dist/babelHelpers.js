(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('ei/babelHelpers', ['exports'], factory);
    } else if (typeof exports === 'object') {
        factory(exports);
    } else {
        factory(root.babelHelpers = {});
    }
}(this, function (global) {
    var babelHelpers = global;
}));