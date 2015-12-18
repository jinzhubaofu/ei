/**
 * @file page init action creator
 * @author leon(ludafa@outlook.com)
 */

const INIT = 'INIT';

exports.INIT = INIT;

exports.init = function (payload) {
    return {
        type: INIT,
        payload
    };
};
