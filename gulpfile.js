// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function () {
    return gulp.src('vizify.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src('vizify.js')
        .pipe(rename('vizify.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('vizify.js', ['lint', 'scripts']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);