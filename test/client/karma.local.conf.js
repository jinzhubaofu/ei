/**
 * @file 本地 karma 测试配置
 * @author ludafa <ludafa@outlook.com>
 */

const karmaConfig = require('./karma.conf.js');

module.exports = function (config) {
    config.set(
        Object.assign(
            {},
            karmaConfig,
            {
                singleRun: false
            }
        )
    );
};
