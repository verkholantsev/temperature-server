'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('js', function () {
    gulp.src('./src/app.jsx')
        .pipe(browserify({
            transform: ['reactify', '6to5ify'],
            extensions: ['.jsx', '.js']
        }))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./public/'));
});
