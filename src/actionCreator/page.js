/**
 * @file page init action creator
 * @author leon(ludafa@outlook.com)
 */

const INIT = 'ei/INIT';

exports.INIT = INIT;

exports.init = function (payload) {
    return {
        type: INIT,
        payload
    };
};

const REPLACE = 'ei/REPLACE';

exports.REPLACE = REPLACE;

exports.replace = function (payload) {
    return {
        type: REPLACE,
        payload
    };
};
