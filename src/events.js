/**
 * @file ei系统消息总线
 * @author Leon(leon@outlook.com)
 * @module events
 */

const Emitter = require('./Emitter');

const events = {};

module.exports = Emitter.enable(events);
