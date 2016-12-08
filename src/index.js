/**
 * @file ei主入口
 * @author Leon(leon@outlook.com)
 * @module ei
 */

const App = require('./App');

const Page = require('./Page');

const Container = require('./Container');

const events = require('./events');

const resource = require('./resource');

const composeReducer = require('./util/composeReducer');

const connect = require('./util/connect');

const pageActionCreators = require('./actionCreator/page');

module.exports = {
    App,
    Page,
    Container,
    events,
    resource,
    composeReducer,
    connect,
    INIT: pageActionCreators.INIT
};
