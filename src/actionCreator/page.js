/**
 * @file page init action creator
 * @author leon(ludafa@outlook.com)
 */

export const INIT = 'ei/INIT';

export function init(payload) {
    return {
        type: INIT,
        payload
    };
}

export const REPLACE = 'ei/REPLACE';

export function replace(payload) {
    return {
        type: REPLACE,
        payload
    };
}
