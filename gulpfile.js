'use strict';

var gulp = require('gulp');

// --------------- SCSS -----------------

var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

var px2rem = require('gulp-px2rem');

var px2remOptions = {
   replace: true
};

var postCssOptions = {
   map: true  
};

gulp.task('sass', function () {
 return gulp.src('./src/styles/main.scss')
   .pipe(sass().on('error', sass.logError))
  //  .pipe(px2rem(px2remOptions, postCssOptions))
   .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
   .pipe(gulp.dest('./build/styles'));

});

// ---------------- PUG -------------------

var pug = require('gulp-pug');

gulp.task('pug', function buildHTML() {
  return gulp.src('./src/templates/**/*.pug')
  .pipe(pug({
    pretty: true 
  }))
  .pipe(gulp.dest('./build/assets'));
});

// --------------- IMAGES -----------------

var tinypng = require('gulp-tinypng-compress');

gulp.task('tinypng', function () {
	gulp.src('./src/img/**/*.{png,jpg,jpeg}')
		.pipe(tinypng({
			key: 'l24fUOu4hXFd9vBdrobEB8nfVjpyHHpm',
			sigFile: 'images/.tinypng-sigs',
			log: true
		}))
		.pipe(gulp.dest('./build/img/'));
});

// -------------- WEBPACK -----------------

var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack', function() {
  return gulp.src('src/scripts/app.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest('build/assets/scripts'));
});

// --------------- WATCH ------------------

gulp.task('watch', function () {
 gulp.watch('./src/styles/**/*.scss', gulp.series('sass'));
 gulp.watch('./src/templates/**/*.pug', gulp.series('pug'));
 gulp.watch('./src/img/**/*.{png,jpg,jpeg}', gulp.series('tinypng'));
 gulp.watch('./src/scripts/**/*.js', gulp.series('webpack'));
});

