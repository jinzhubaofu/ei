/**
 * @file travis karma
 * @author ludafa <ludafa@outlook.com>
 */

const karmaConfig = require('./karma.conf.js');

module.exports = function (config) {

    config.set(
        Object.assign(
            {},
            karmaConfig,
            {

                browserStack: {
                    username: 'leonlu2',
                    accessKey: 'ps6dvCJdxhJGWWSTrWM4'
                },

                /* eslint-disable fecs-camelcase */
                // define browsers
                customLaunchers: {
                    bs_chrome_mac: {
                        base: 'BrowserStack',
                        browser: 'chrome',
                        browser_version: '55.0',
                        os: 'OS X',
                        os_version: 'Sierra'
                    }
                },
                /* eslint-enable fecs-camelcase */

                browsers: [
                    'bs_chrome_mac'
                ],
                // if true, Karma captures browsers, runs the tests and exits
                singleRun: true
            }
        )
    );

};
