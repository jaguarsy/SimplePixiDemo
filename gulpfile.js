var gulp = require('gulp');
var rollup = require('rollup').rollup;
var json = require('rollup-plugin-json');
var babel = require('rollup-plugin-babel');
var connect = require('gulp-connect');

const DEFAULT_PORT = 8080;

gulp.task('script', function () {
  return rollup({
    entry: 'src/js/index.js',
    format: 'cjs',
    plugins: [
      json(),
      babel()
    ]
  }).then(function (bundle) {
    return bundle.write({
      format: 'iife',
      dest: 'main.js'
    });
  });
});

gulp.task('copy', ['copy-js', 'copy-html', 'copy-resources']);

gulp.task('copy-js', function () {
  return gulp.src([
    'node_modules/pixi.js/dist/pixi.min.js',
    'node_modules/javascript-astar/astar.js'
  ]).pipe(gulp.dest('lib'));
});

gulp.task('copy-html', function () {
  return gulp.src(['src/index.html'])
    .pipe(gulp.dest('.'));
});

gulp.task('copy-resources', function () {
  return gulp.src(['resources/**/*.*'])
    .pipe(gulp.dest('resources'));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js'], ['script']);
});

gulp.task('webserver', ['script', 'copy', 'watch'], function () {
  connect.server({
    root: '.',
    port: DEFAULT_PORT,
    livereload: false
  });
});

gulp.task('build', ['script', 'copy']);