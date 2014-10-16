var gulp            = require('gulp');
var $               = require('gulp-load-plugins')();

var path            = require('path');
var config          = require('../config.json');

gulp.task('dist', ['build'], function () {
    return gulp.src(path.join(config.dir.build, '**/*.html'))
        .pipe($.size({
            showFiles: true
        }))
        .pipe(gulp.dest(config.dir.dist));
});
