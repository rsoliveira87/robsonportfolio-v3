var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	pump = require('pump');

var scss_file = 'assets/sass/**/*.scss';

var css_dest = 'assets/css/';

var sass_dev_options = {
	outputStyle: 'expanded'
}

var sass_prod_options = {
	outputStyle: 'compressed'
}

var js_file = 'assets/js/*js';

var js_dest = 'assets/js/dist/';

var html_files = ['assets/views/header.html','assets/views/about.html','assets/views/services.html','assets/views/footer.html'];

gulp.task('sassdev', function() {

	return gulp.src(scss_file)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(css_dest))

});

gulp.task('sassprod', function() {

	return gulp.src(scss_file)
		.pipe(sass().on('error', sass.logError))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(css_dest))

});

gulp.task('minifyConcatJS', function(cb){

	pump([
		gulp.src(js_file),
		concat('script.js'),
		gulp.dest(js_dest),
		rename({suffix: '.min'}),
		uglify(),
		gulp.dest(js_dest)
	], cb);

});

gulp.task('concatHtmlFiles', function(){

	return gulp.src(html_files)
		.pipe(concat('index.html'))
		.pipe(gulp.dest('./'))

});

gulp.task('w', function() {

	gulp.watch(scss_file, ['sassdev']);
	gulp.watch(scss_file, ['sassprod']);
	gulp.watch(js_file, ['minifyConcatJS']);
	gulp.watch(html_files, ['concatHtmlFiles']);

});

gulp.task('default', ['sassdev', 'sassprod', 'minifyConcatJS', 'concatHtmlFiles', 'w']);