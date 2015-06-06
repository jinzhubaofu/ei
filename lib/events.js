/**
 * @file ei/events
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var Emitter = require('./Emitter');

var events = {};

Emitter.enable(events);

module.exports = events;
