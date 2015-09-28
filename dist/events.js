define('ei/events', [
    'exports',
    './babelHelpers',
    './Emitter'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var Emitter = require('./Emitter');
    var events = {};
    module.exports = Emitter.enable(events);
});