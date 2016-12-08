/**
 * @file gulpfile
 * @author leon <ludafa@outlook.com>
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const babelHelpers = require('gulp-babel-external-helpers');
const webpack = require('webpack-stream');
const conf = require('./tools/webpack.config');

gulp.task('compile', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(babelHelpers('babelHelpers.js', 'umd'))
        .pipe(gulp.dest('output'));
});

gulp.task('package', ['compile'], () => gulp
    .src('output/index.js')
    .pipe(webpack(conf))
    .pipe(gulp.dest('lib')));

gulp.task('build', ['package'], () => gulp.src('output').pipe(clean()));

gulp.task('default', ['build']);
