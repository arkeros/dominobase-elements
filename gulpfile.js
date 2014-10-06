/*global require*/
'use strict';

var glob            = require('glob');
var path            = require('path');

var gulp            = require('gulp');
var $               = require('gulp-load-plugins')();
var runSequence     = require('run-sequence');

var rimraf = require('rimraf');
var stylishReporter = require('jshint-stylish');

var config = {
    'srcDir': 'src',
    'tmpDir': '.tmp',
    'buildDir': 'build',
    'distDir': '.'
};

gulp.task('haml', function () {
    return gulp.src(config.srcDir + '/**/*.haml')
        .pipe($.rubyHaml())
        .pipe(gulp.dest(config.tmpDir));
});


gulp.task('coffee', function () {
    return gulp.src(config.srcDir + '/scripts/**/*.coffee')
        .pipe($.coffee({bare: true}))
//        .pipe($.closureCompiler({
//            compilerPath: 'bower_components/closure-compiler/compiler.jar',
//            fileName: 'build.js'
//        }))
        .pipe(gulp.dest(config.tmpDir + '/scripts/'));
});

gulp.task('sass', function () {
    return gulp.src(config.srcDir + '/styles/**/*.sass')
        .pipe($.rubySass())
        .pipe($.autoprefixer("last 2 versions", "> 1%", "ie 8", "ie 7"))
        .pipe(gulp.dest(config.tmpDir + '/styles/'));
});

// Clean

gulp.task('clean:build', function (cb) {
    return rimraf(config.buildDir, cb);
});

gulp.task('clean:tmp', function (cb) {
    return rimraf(config.tmpDir, cb);
});

gulp.task('clean', ['clean:tmp', 'clean:build']);


// default
gulp.task('precompile', ['haml', 'sass', 'coffee']);

gulp.task('build:root', function () {
    return gulp.src(config.tmpDir + '/*.html')
        .pipe($.smoosher())
        .pipe(gulp.dest(config.buildDir + '/'));
});

gulp.task('build:cards', function () {
    return gulp.src(config.tmpDir + '/cards/*.html')
        .pipe($.smoosher())
        .pipe(gulp.dest(config.buildDir + '/cards/'));
});

gulp.task('build:pages', function () {
    return gulp.src(config.tmpDir + '/pages/*.html')
        .pipe($.smoosher())
        .pipe(gulp.dest(config.buildDir + '/pages/'));
});

gulp.task('build:layouts', function () {
    return gulp.src(config.tmpDir + '/layouts/*.html')
        .pipe($.smoosher())
        .pipe(gulp.dest(config.buildDir + '/layouts/'));
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
    return gulp.src(config.buildDir + '/**/*.html')
        .pipe($.size({
            showFiles: true
        }))
        .pipe(gulp.dest(config.distDir + '/'));
});
