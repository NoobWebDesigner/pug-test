const gulp = require("gulp");
const sass = require("gulp-sass");//sass
const plumber = require("gulp-plumber");//エラー無視
const notify = require("gulp-notify");//エラー通知
const pug = require("gulp-pug");//Pug
const sourcemaps = require('gulp-sourcemaps');//ソースマップ
const autoprefixer = require('gulp-autoprefixer');//ベンダープレフィックス作成
const header = require('gulp-header');

gulp.task('default', ['sass', 'pug', 'watch']);//task

//sassとpugの監視をして変換処理させる
gulp.task('watch', () => {
  gulp.watch(['./dev/scss/**'], () => {
    gulp.start(['sass']);
  });
  gulp.watch(['./dev/pug/**'], () => {
    gulp.start(['pug']);
  });
});

//sassをcssに変換
gulp.task("sass", () => {
  gulp.src("./dev/scss/**/*scss")
    .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))//sass作成
    .pipe(header('@charset "UTF-8";\n\n'))
    .pipe(gulp.dest("./prd/css"))//cssに出力
    .pipe(sourcemaps.init({loadMaps: true}))//soucemaps
    .pipe(autoprefixer({
    browsers: ["last 3 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
      cascade: false
      }))
    .pipe(sourcemaps.write('./'))//soucemaps書き出し
    .pipe(gulp.dest("./prd/css"))
});

//pugをhtmlに変換
gulp.task("pug", () => {
  const option = {
    pretty: true
  }
  gulp.src("./dev/pug/**/*.pug")
    .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
    .pipe(pug(option))
    .pipe(gulp.dest("./prd/"))
});
