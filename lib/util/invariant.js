/**
 * @file invariant
 * @author Leon(leon@outlook.com)
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

/* eslint-disable max-params */

/**
 * 断言
 *
 * @ignore
 *
 * @param {boolean}     condition 断言条件
 * @param {string}      format 断言失败消息模板
 * @param {*} a 断言失败消息数据
 * @param {*} b 断言失败消息数据
 * @param {*} c 断言失败消息数据
 * @param {*} d 断言失败消息数据
 * @param {*} e 断言失败消息数据
 * @param {*} f 断言失败消息数据
 */
var invariant = function (condition, format, a, b, c, d, e, f) {

    if (condition) {
        return;
    }

    if (!format) {
        throw new Error(''
            + 'Minified exception occurred; use the non-minified dev environment '
            + 'for the full error message and additional helpful warnings.'
        );
    }

    var args = [a, b, c, d, e, f];
    var argIndex = 0;

    var message = ''
        + 'Invariant Violation: '
        + format.replace(/%s/g, function () {
            return args[argIndex++];
        });

    throw new Error(message);

};

/* eslint-enable max-params */

module.exports = invariant;
