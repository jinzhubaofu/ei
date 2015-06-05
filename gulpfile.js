/**
 * @file gulpfile.js
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var gulp = require('gulp');
var header = require('gulp-header');
var footer = require('gulp-footer');

gulp.task('default', function () {
    return gulp.src('lib/**/*.js')
        .pipe(header('define(require, exports, module) {\n'))
        .pipe(footer('\n});'))
        .pipe(gulp.dest('src'));
});

