/*global require*/
'use strict';

var gulp            = require('gulp');
var $               = require('gulp-load-plugins')();
var runSequence     = require('run-sequence');

var path            = require('path');
//https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
var del             = require('del');

var config = {
    'srcDir':   'src/',
    'tmpDir':   '.tmp/',
    'buildDir': 'build/',
    'distDir':  './'
};

gulp.task('haml', function () {
    return gulp.src(path.join(config.srcDir, '**/*.haml'))
        .pipe($.rubyHaml())
        .pipe(gulp.dest(config.tmpDir));
});


gulp.task('coffee', function () {
    return gulp.src(path.join(config.srcDir, 'scripts/**/*.coffee'))
        .pipe($.coffee({bare: true}))
        .pipe(gulp.dest(path.join(config.tmpDir, 'scripts')));
});

gulp.task('sass', function () {
    return gulp.src(path.join(config.srcDir, 'styles/**/*.sass'))
        .pipe($.rubySass())
        .pipe($.autoprefixer('last 2 versions', '> 1%', 'ie 8', 'ie 7'))
        .pipe(gulp.dest(path.join(path.join(config.tmpDir, 'styles'))));
});

// Clean
gulp.task('clean', function (cb) {
    del([
        config.tmpDir,
        config.buildDir
    ], cb);
});

// default
gulp.task('precompile', ['haml', 'sass', 'coffee']);

gulp.task('build:root', function () {
    return gulp.src(path.join(config.tmpDir, '*.html'))
        .pipe($.smoosher())
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('build:cards', function () {
    return gulp.src(path.join(config.tmpDir, 'cards/*.html'))
        .pipe($.smoosher())
        .pipe(gulp.dest(path.join(config.buildDir, 'cards')));
});

gulp.task('build:pages', function () {
    return gulp.src(path.join(config.tmpDir, 'pages/*.html'))
        .pipe($.smoosher())
        .pipe(gulp.dest(path.join(config.buildDir, 'pages')));
});

gulp.task('build:layouts', function () {
    return gulp.src(path.join(config.tmpDir, 'layouts/*.html'))
        .pipe($.smoosher())
        .pipe(gulp.dest(path.join(config.buildDir, 'layouts')));
});

gulp.task('build', ['build:root', 'build:pages', 'build:layouts', 'build:cards']);


gulp.task('default', ['clean'], function (cb) {
    runSequence(
        'precompile',
        'build',
        'dist',
        cb
    );
});

gulp.task('dist', function () {
    return gulp.src(path.join(config.buildDir, '**/*.html'))
        .pipe($.size({
            showFiles: true
        }))
        .pipe(gulp.dest(config.distDir));
});

gulp.task('watch', function () {
    gulp.watch(path.join(config.srcDir, '**/*.haml'), function () {
        runSequence(
            'haml',
            'build',
            'dist'
        );
    });
    gulp.watch(path.join(config.srcDir, '**/*.sass'), function () {
        runSequence(
            'sass',
            'build',
            'dist'
        );
    });
    gulp.watch(path.join(config.srcDir, '**/*.coffee'), function () {
        runSequence(
            'coffee',
            'build',
            'dist'
        );
    });
});
