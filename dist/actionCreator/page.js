define('ei/actionCreator/page', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    var INIT = 'INIT';
    exports.INIT = INIT;
    exports.init = function (payload) {
        return {
            type: INIT,
            payload: payload
        };
    };
});