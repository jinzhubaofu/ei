/**
 * @file karma test common config
 * @author ludafa <ludafa@outlook.com>
 */

const path = require('path');

module.exports = {

    basePath: path.join(__dirname, '../../'),

    frameworks: ['jasmine'],

    files: [
        'test/client/spec/**/*.spec.js'
    ],

    browsers: [
        'Chrome',
        'Firefox'
    ],

    preprocessors: {
        'src/**/*.js': ['coverage'],
        'test/**/*.js': ['webpack']
    },

    webpack: {
        module: {
            preLoaders: [{
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }]
        },
        devtool: 'inline-source-map'
    },

    autoWatch: true,

    reporters: ['progress', 'coverage'],

    coverageReporter: {
        dir: path.join(__dirname, './coverage'),
        reporters: [
            // reporters not supporting the `file` property
            {type: 'html'},
            {type: 'json', subdir: './', file: 'coverage.json'},
            {type: 'lcov', subdir: 'lcov'}
        ]
    }

};
