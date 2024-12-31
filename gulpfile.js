const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

function scssTask() {
    return gulp.src("src/scss/zephcode.scss")
        .pipe(sass().on("error", sass.logError)) // Compile SCSS
        .pipe(cleanCSS()) // Minify CSS
        .pipe(rename("zephcode.min.css")) // Rename output file
        .pipe(gulp.dest("docs")) // Output langsung ke folder docs
        .pipe(browserSync.stream()); // Reload CSS di BrowserSync
}

function watchTask() {
    browserSync.init({
        server: {
            baseDir: "./docs", // Set folder docs sebagai server root
        },
        open: true, // Buka browser secara otomatis
    });

    gulp.watch("src/scss/**/*.scss", scssTask); // Watch SCSS changes
    gulp.watch("docs/**/*.html").on("change", browserSync.reload); // Reload on HTML changes
}

exports.default = gulp.series(scssTask, watchTask);
exports.build = scssTask;
