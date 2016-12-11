/**
 * @file ei主入口
 * @author Leon(leon@outlook.com)
 * @module ei
 */

let App = require('./App');

let Page = require('./Page');

let Container = require('./Container');

let events = require('./events');

let resource = require('./resource');

const {
    INIT,
    REPLACE,
    init,
    replace
} = require('./actionCreator/page');

module.exports = {
    App,
    Page,
    Container,
    events,
    resource,
    actionTypes: {
        INIT,
        REPLACE
    },
    actions: {
        init,
        replace
    }
};
