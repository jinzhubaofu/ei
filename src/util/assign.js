/**
 * @file es6 Object.assign polyfill
 * @author leon(ludafa@outlook.com)
 */

const hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = Object.assign || function (target, ...sources) {

    if (target == null) {
        throw new Error('assign target cannot be null');
    }

    for (let i = 0, len = sources.length; i < len; ++i) {

        const source = sources[i];

        if (typeof source !== 'object') {
            continue;
        }

        for (let key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }

    }

    return target;
};
