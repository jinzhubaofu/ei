/**
 * @file gulpfile
 * @author leon <ludafa@outlook.com>
 */

const gulp = require('gulp');
const webpack = require('webpack-stream');
const devConf = require('./tools/webpack');
const prodConf = require('./tools/webpack.min');

gulp.task(
    'dev',
    () => gulp
        .src('src/index.js')
        .pipe(webpack(devConf))
        .pipe(gulp.dest('lib'))
);

gulp.task(
    'prod',
    () => gulp
        .src('src/index.js')
        .pipe(webpack(prodConf))
        .pipe(gulp.dest('lib'))
);

gulp.task('build', ['dev', 'prod']);

gulp.task('default', ['build']);
