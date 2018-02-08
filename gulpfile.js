// Requis
var gulp = require('gulp');
var rename = require('gulp-rename');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = 'wp-content/themes/sweetcloset'; // dossier de travail
var destination = 'wp-content/themes/sweetcloset'; // dossier à livrer

// Tâche "build" = LESS + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task('css', function () {
  return gulp.src(source + '/scss/*.scss')
    .pipe(plugins.sass())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.replace('/img/', '/wp-content/themes/sweetcloset/img/'))
    .pipe(gulp.dest(destination + '/css/'));
});

gulp.task('js', function () {
    return gulp.src(source + '/js/*.js')
        .pipe(plugins.jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(destination + '/dist/js/'));
});

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
  return gulp.src(source + '/css/*.css')
    .pipe(plugins.csso())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination + '/dist/css/'));
});

var mysqlDump = require('mysqldump');

//tache dump_db
gulp.task('mysqldump', function() {

    mysqlDump({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'wp_sweetcloset',
        dest:'./wp_sweetcloset.sql' // destination file
    },function(err){
        // create data.sql file;
    })
});


// Tâche "build"
gulp.task('build', ['css']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify', 'js']);

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
  gulp.watch(source + '/scss/*.scss', ['build']);
});

// Tâche par défaut
gulp.task('default', ['build']);
