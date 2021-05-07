var gulp = require('gulp')
  , gutil = require('gulp-util')
  , del = require('del')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , minifycss = require('gulp-minify-css')
  , minifyhtml = require('gulp-minify-html')
  , processhtml = require('gulp-processhtml')
  , jshint = require('gulp-jshint')
  , uglify = require('gulp-uglify')
  , connect = require('gulp-connect')
  , server = require('gulp-express')
  , paths;

paths = {
  assets: ['src/assets/**/*', '!src/assets/**/*.psd', '!src/assets/**/*.mp3'],
  css:    'src/css/*.css',
  libs:   [
    'src/bower_components/phaser-official/build/custom/phaser-arcade-physics.min.js'
  ],
  js:     ['src/js/**/*.js', '!src/js/controller/**/*.js'],
  dist:   './dist/'
};

gulp.task('clean', function (cb) {
  return del([paths.dist], cb);
});

gulp.task('copy-assets', function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + 'assets'))
    .on('error', gutil.log);
});

gulp.task('copy-vendor', function () {
  return gulp.src(paths.libs)
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('uglify', function () {
  return gulp.src(paths.js)
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify({outSourceMaps: false}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minifycss', function () {
  return gulp.src(paths.css)
    .pipe(minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('processhtml', function() {
  return gulp.src('src/index.html')
    .pipe(processhtml({}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('minifyhtml', function() {
  return gulp.src('dist/index.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

// gulp.task('lint', function() {
//   gulp.src(paths.js)
//     .pipe(jshint('.jshintrc'))
//     .pipe(jshint.reporter('default'))
//     .on('error', gutil.log);
// });

gulp.task('html', function(){
  gulp.src('src/*.html')
    .pipe(connect.reload())
    .on('error', gutil.log);
});

gulp.task('connect', function () {
  connect.server({
    root: [__dirname + '/src'],
    port: 9000,
    livereload: true
  });
});

gulp.task('connect-dist', function () {
    connect.server({
      root: [__dirname + '/dist'],
      port: 9000,
      livereload: true
    });
  });

gulp.task('server', function () {
    server.run(['src/app.js', 'watch']);
});

gulp.task('watch', function () {
  //gulp.watch(paths.js, ['lint']);
  gulp.watch('./src/index.html', gulp.series('html'));
  gulp.watch(paths.css);
  gulp.watch(paths.js);
});



gulp.task('default', gulp.series('connect', 'watch'));
gulp.task('serve-dist', gulp.series('connect-dist'));

gulp.task('build', gulp.series('clean', 'copy-assets', 'copy-vendor', 'uglify', 'minifycss', 'processhtml', 'minifyhtml'));
