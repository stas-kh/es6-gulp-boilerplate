"use strict";

// Gulp requires all needed modules which are available in node_modules folder
let gulp = require("gulp"),
	browserify = require("browserify"),
	source = require("vinyl-source-stream"),
	babelify = require("babelify"),
	uglify = require("gulp-uglify"),
	buffer = require("vinyl-buffer"),
	sourcemaps = require("gulp-sourcemaps"),
	concat = require("gulp-concat"),
	cleanCSS = require("gulp-clean-css"),
	replace = require("gulp-replace");

// Config contains additional variables to be able to set up gulp tasks easier
const config = {
	destFolder: "dist",
	jsFileName: "pattern.min.js",
	cssFileName: "styles.min.css",
	paths: {
		css: "./src/css/**/*.css",
		js: "./src/js/**/*.js",
		html: "./src/index.html"
	},
	browserifyOptions: {
		entries: "./src/js/index.js",
		debug: true
	}
};

// The task compiles JS code, read more info in comments below
gulp.task("compile:js", () => {
	// At first, browserify adapts all 'require' calls in source code to make browser understand them
	return browserify(config.browserifyOptions)
		// after, we transform the code using babelify (It uses Babel to compile ES6 -> ES5)
		.transform(babelify)
		.bundle()
		.pipe(source(config.jsFileName))
		// buffer converts streaming vinyl files to use buffers
		.pipe(buffer())
		// source maps have to be defined before minifying files
		.pipe(sourcemaps.init({ loadMaps: true }))
		// uglify minifies JS code
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(`${config.destFolder}/js`))
});

// The task minifies CSS using cleanCSS, it also writes source maps
gulp.task("minify:css", function() {
	return gulp.src(config.paths.css)
		.pipe(sourcemaps.init())
		.pipe(cleanCSS())
		.pipe(concat(config.cssFileName))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(`${config.destFolder}/css`));
});

// The task copies HTML file to dist folder, it helps to have a production version of the project in one folder
gulp.task("copy:html", () => {
	return gulp.src("index.html")
		// It replaces pathes to JS and CSS files inside HTML code
		.pipe(replace(new RegExp(`../${config.destFolder}/`, "g"), ""))
		.pipe(gulp.dest(`${config.destFolder}/`))
});

// Watch allows to observe each change in source files to re-compile the code
/*
	For WebStorm users:
	If the 'watch' does not work in WebStorm, you have to do the following:
		1. Go to Settings -> Appearance & Behavior -> System Settings
		2. Be sure that 'Use `safe write`' checkbox in unchecked
 */
gulp.task("watch", () => {
	gulp.watch(config.paths.css, ["minify:css"]);
	gulp.watch(config.paths.js, ["compile:js"]);
	gulp.watch(config.paths.html, ["copy:html"]);
});

gulp.task("default", ["compile:js", "minify:css", "copy:html", "watch"]);