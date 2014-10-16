var gulp            = require('gulp');
var $               = require('gulp-load-plugins')();

var path            = require('path');
var config          = require('../config.json');

gulp.task('haml', ['clean'], function () {
    return gulp.src(path.join(config.dir.src, '**/*.haml'))
        .pipe($.rubyHaml())
        .pipe(gulp.dest(config.dir.tmp));
});


gulp.task('coffee', ['clean'], function () {
    return gulp.src(path.join(config.dir.src, 'scripts/**/*.coffee'))
        .pipe($.coffee({bare: true}))
        .pipe(gulp.dest(path.join(config.dir.tmp, 'scripts')));
});

gulp.task('sass', ['clean'], function () {
    return gulp.src(path.join(config.dir.src, 'styles/**/*.sass'))
        .pipe($.rubySass())
        .pipe($.autoprefixer('last 2 versions', '> 1%', 'ie 8', 'ie 7'))
        .pipe(gulp.dest(path.join(config.dir.tmp, 'styles')));
});

gulp.task('build', ['clean', 'haml', 'sass', 'coffee'], function () {
    return gulp.src(path.join(config.dir.tmp, '*.html'))
        .pipe($.smoosher())
        .pipe(gulp.dest(config.dir.build));
});
