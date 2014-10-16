var gulp            = require('gulp');
var $               = require('gulp-load-plugins')();

var path            = require('path');
var config          = require('../config.json');

gulp.task('watch', function () {
    gulp.watch(path.join(config.dir.src, '**/*.haml'), ['haml']);
    gulp.watch(path.join(config.dir.src, '**/*.sass'), ['sass']);
    gulp.watch(path.join(config.dir.src, '**/*.coffee'), ['coffee']);

    gulp.watch(path.join(config.dir.tmp, '**/*'), ['build']);
    gulp.watch(path.join(config.dir.build, '**/*'), ['dist']);
});
