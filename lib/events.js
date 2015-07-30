/**
 * @file ei系统消息总线
 * @author Leon(leon@outlook.com)
 * @module events
 */

var Emitter = require('./Emitter');

var events = {};

module.exports = Emitter.enable(events);
