// Requis
var gulp = require('gulp');
var rename = require('gulp-rename');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json


// Tâche "build" = LESS + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task('css', function () {
  return gulp.src('scss/*.scss')
    .pipe(plugins.sass())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest('css/'));
});

gulp.task('jsmin', function () {
    return gulp.src('js/*.js')
        .pipe(plugins.jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('js/'));
});

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
  return gulp.src('css/*.css')
    .pipe(plugins.csso())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css/'));
});

// Tâche "build"
gulp.task('build', ['css']);

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
  gulp.watch('scss/*.scss', ['build']);
});

// Tâche par défaut
gulp.task('default', ['build']);
