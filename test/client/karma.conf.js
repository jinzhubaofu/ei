/**
 * @file karma test common config
 * @author ludafa <ludafa@outlook.com>
 */

const path = require('path');

module.exports = {

    basePath: path.join(__dirname, '../../'),

    frameworks: ['jasmine'],

    files: [
        'test/client/index.js'
    ],

    browsers: [
        'Chrome'
    ],

    preprocessors: {
        'src/**/*.js': ['coverage', 'sourcemap'],
        'test/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: {
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/
                },
                {
                    test: /\.json$/,
                    loaders: ['json']
                }
            ]
        },
        devtool: 'inline-source-map'
    },

    autoWatch: true,

    reporters: ['progress', 'coverage', 'mocha'],

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
