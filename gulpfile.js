var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');


// Run mini server
gulp.task('server', function() {
		browserSync.init({
		server: "./",
        notify: false,
        reloadDebounce: 5000
    });
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['./assets/scss/*.scss',
                     './assets/scss/*/*.scss'])
        // .pipe(sourcemaps.init()) // uncomment for debug only
        .pipe(sass({style: 'compressed'}))
        .pipe(minifyCSS())
        // .pipe(sourcemaps.write()) // uncomment for debug only
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
});

// Concatenate & Minify CSS
gulp.task('minify-css', function() {
    return gulp.src('./bower_components/bootstrap/dist/css/bootstrap.css')
    	// .pipe(sourcemaps.init())// uncomment for debug only
    	.pipe(minifyCSS())
        // .pipe(sourcemaps.write())// uncomment for debug only
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function(){
	gulp.watch('./assets/scss/*/*.scss', ['sass']);
    gulp.watch('./assets/scss/*/*.scss', ['sass']);
	gulp.watch("./*.html").on('change', browserSync.reload);
});



// Static server
gulp.task('default', ['sass', 'minify-css','server','watch']);