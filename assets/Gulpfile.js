var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var config = {
    sassFiles: './css/styles.scss',
    allCssFiles: ['./css/*.scss', './css/**/*.scss', './css/*.css', './css/**/*.css'],
    fontFiles: ['./fonts/**/*'],
    destDir: './dist/',
    nameDirCss: 'css'
};

// Get all CSS main files
gulp.task('styles', function() {
    gulp.src([config.sassFiles])
      .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(plugins.rename({
          basename: "app",
          suffix: ".min",
          extname: ".css"
        }))
        .pipe(plugins.sourcemaps.write('../' + config.destDir + config.nameDirCss + '/'))
        .pipe(gulp.dest(config.destDir + config.nameDirCss + '/'))
});

gulp.task('fonts', function() {
  gulp.src(config.fontFiles)
    .pipe(plugins.filter(['*.ttf', '*.woff', '*.woff2', '*.otf', '*.svg', '*.eot']))
    .pipe(gulp.dest(config.destDir + 'vendors/fonts/'));
});

gulp.task('watch', function() {
  gulp.watch(config.allCssFiles, ['styles']);
  gulp.watch(config.fontFiles, ['fonts']);
});

gulp.task('default', ['styles', 'fonts', 'watch']);
