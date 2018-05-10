var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	pump = require('pump')
	spritesmith = require('gulp.spritesmith');

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

gulp.task('minify_concat_js', function(cb){

	pump([
		gulp.src(js_file),
		concat('script.js'),
		gulp.dest(js_dest),
		rename({suffix: '.min'}),
		uglify(),
		gulp.dest(js_dest)
	], cb);

});

gulp.task('generate_sprite', function(){

	var spriteData = gulp.src('assets/img/icons/*.png')
		.pipe(spritesmith({
			imgName: 'skills.png',
			cssName: 'skills.css'
		}));
	spriteData.img.pipe(gulp.dest('assets/img/sprites/'));
	spriteData.css.pipe(gulp.dest('assets/css/'));

});

gulp.task('w', function() {

	gulp.watch(scss_file, ['sassdev']);
	gulp.watch(scss_file, ['sassprod']);
	gulp.watch(js_file, ['minify_concat_js']);

});

gulp.task('default', ['sassdev', 'sassprod', 'minify_concat_js', 'w']);