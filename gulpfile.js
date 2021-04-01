const gulp = require("gulp");

/* sass */
const sass = require("gulp-sass");

/* browser-sync */
const browserSync = require("browser-sync");

/* imagemin */
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminOption = [
  imageminPngquant({ quality: [0.65, 0.8] }),
  imageminMozjpeg({ quality: 85 }),
  imagemin.gifsicle({
    interlaced: false,
    optimizationLevel: 1,
    colors: 256,
  }),
  imagemin.mozjpeg(),
  imagemin.optipng(),
  imagemin.svgo(),
];

gulp.task("sass", function () {
  return gulp
    .src("./css/*.scss")
    .pipe(sass())
    .on("error", sass.logError)

    .pipe(gulp.dest("./css"));
});

gulp.task("watch", function (done) {
  gulp.watch("./css/*.scss", gulp.task("sass"));
  gulp.watch("./css/*.scss", gulp.task("bs-reload"));
  gulp.watch("./js/*.js", gulp.task("bs-reload"));
  gulp.watch("./*.html", gulp.task("bs-reload"));
});

gulp.task("browser-sync", function (done) {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html",
    },
  });
  done();
});

gulp.task("bs-reload", function (done) {
  browserSync.reload();
  done();
});

gulp.task("imagemin", function () {
  return gulp
    .src("./img/**/*")
    .pipe(imagemin(imageminOption))
    .pipe(gulp.dest("./img"));
});

gulp.task("default", gulp.series(gulp.parallel("browser-sync", "watch")));
