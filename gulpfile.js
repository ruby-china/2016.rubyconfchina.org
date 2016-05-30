var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  	//gulp.run("libs");
    gulp.run("generate");
    gulp.run("watch");
    gulp.run("server");
});

var paths = {
    sassSrcPath: ['src/stylesheets/application.scss'],
    sassDestPath: ['assets/css/'],
    sassImportsPath: ['src/stylesheets/']
};

gulp.task('scss', function() {
  gulp.src(paths.sassSrcPath)
      //.pipe(autoprefixer({
      //          browsers: ['last 5 Chrome versions', 'iOS > 0', 'Android > 0', '> 5%'],
      //          cascade: true,
      //          remove:true
      //      }))
    sass(paths.sassSrcPath,{precision: 5, loadPath: [paths.sassImportsPath]} )
    
    //.pipe(uncss({html: ['public/*.html']}))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('image', function() {
  gulp.src('./src/images/*.*')
    //.pipe(imagemin({
    //        progressive: true,
    //        svgoPlugins: [{removeViewBox: false}]
    //    }))
    .pipe(gulp.dest('assets/images'));
  gulp.src(['./src/images/*.jpg', './src/images/*.png'])
    //.pipe(imagemin({
    //        progressive: true,
    //        svgoPlugins: [{removeViewBox: false}]
    //    }))
    .pipe(gulp.dest('assets/images'));
});

gulp.task('js', function() {
  gulp.src(['./src/javascripts/*.js','./src/javascripts/**/*.js'])
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

// Basic Functions Done ==================================

// Libs Done ============================================

// Start a Assets Server ============================
gulp.task('server', [ 'generate' ], function() {
    return connect.server({
        root: [ '.' ],
        livereload: true
    });
});

// Server Doen ======================================

gulp.task('generate', ['image', 'scss', 'js'])

gulp.task('clean', function(cb) {
    del(['assets/css/*.css', 'assets/css/*.map', 'assets/js'], cb)
});

gulp.task('reload', ['clean', 'default'])

gulp.task('watch', function() {

    livereload.listen();
    gulp.watch(['src/**']).on('change', livereload.changed);

    gulp.watch('src/images/*.*', ['image']);

    // Watch .scss files/
    gulp.watch('src/stylesheets/**/*.css', ['css']);
    gulp.watch('src/stylesheets/*.css', ['css']);
    gulp.watch('src/stylesheets/**/*.scss', ['scss']);
    gulp.watch('src/stylesheets/*.scss', ['scss']);


    // Watch .js files
    gulp.watch('src/javascripts/*.js', ['js']);
    gulp.watch('src/javascripts/**/*.js', ['js']);

});