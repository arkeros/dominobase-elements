var gulp            = require('gulp');
var $               = require('gulp-load-plugins')();

//https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
var del             = require('del');
var config          = require('../config.json');

gulp.task('clean', function (cb) {
    del([
        config.dir.tmp,
        config.dir.build
    ], cb);
});
