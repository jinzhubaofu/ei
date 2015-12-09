/**
 * @file guid
 * @author leon(ludafa@outlook.com)
 */

module.exports = function () {
    return Math.random().toString(36).substr(2, 12);
};
