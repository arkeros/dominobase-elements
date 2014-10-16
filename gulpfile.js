/*global require*/
'use strict';

var gulp            = require('gulp');
var $               = require('gulp-load-plugins')();
var runSequence     = require('run-sequence');

var requireDir      = require('require-dir');
var dir             = requireDir('./tasks');

gulp.task('default', ['build']);
