/**
 * @file es6 Object.assign polyfill
 * @author leon(ludafa@outlook.com)
 */

const hasOwnProperty = Object.prototype.hasOwnProperty;

export default Object.assign || function (target, ...sources) {

    if (target == null) {
        throw new Error('assign target cannot be null');
    }

    for (let i = 0, len = sources.length; i < len; ++i) {

        const source = sources[i];

        if (typeof source !== 'object') {
            continue;
        }

        /* eslint-disable fecs-use-for-of */
        for (let key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
        /* eslint-enable fecs-use-for-of */

    }

    return target;
};
