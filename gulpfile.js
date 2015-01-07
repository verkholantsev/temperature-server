'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('js', function () {
    gulp.src('./src/app.js')
        .pipe(browserify({
            debug: true,
            transform: ['reactify', '6to5ify'],
            extensions: ['.jsx', '.js']
        }))
        .pipe(gulp.dest('./public/'));
});
