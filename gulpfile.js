"use strict";

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

const config = {
	destFolder: "dist",
	jsFileName: "pattern.min.js",
	cssFileName: "styles.min.css",
	paths: {
		css: "./src/css/**/*.css",
		js: "./src/js/**/*.js",
		html: "./index.html"
	}
};

const browserifyOptions = {
	entries: "./src/js/index.js",
	debug: true
};

gulp.task("compile:js", () => {
	return browserify(browserifyOptions)
		.transform(babelify)
		.bundle()
		.pipe(source(config.jsFileName))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(`${config.destFolder}/js`))
});

gulp.task("minify:css", function() {
	return gulp.src(config.paths.css)
		.pipe(sourcemaps.init())
		.pipe(cleanCSS())
		.pipe(concat(config.cssFileName))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(`${config.destFolder}/css`));
});

gulp.task("copy:html", () => {
	return gulp.src("index.html")
		.pipe(replace(new RegExp(`${config.destFolder}/`, "g"), ""))
		.pipe(gulp.dest(`${config.destFolder}/`))
});

gulp.task("watch", () => {
	gulp.watch(config.paths.css, ["minify:css"]);
	gulp.watch(config.paths.js, ["compile:js"]);
	gulp.watch(config.paths.html, ["copy:html"]);
});

gulp.task("default", ["compile:js", "minify:css", "copy:html", "watch"]);