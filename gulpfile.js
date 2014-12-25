'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var insert = require('gulp-insert');
var browserify = require('gulp-browserify');

gulp.task('templates', function () {
    gulp.src('./templates/*.jade')
        .pipe(jade({client: true}))
        .pipe(insert.wrap(';var jade = require(\'../node_modules/jade/runtime\');module.exports = ', ';'))
        .pipe(gulp.dest('./templates/'));
});

gulp.task('js', function () {
    gulp.src('./src/app.js')
        .pipe(browserify())
        .pipe(gulp.dest('./public/'));
});
