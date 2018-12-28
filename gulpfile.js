var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglifyjs'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');


var PATH = {
    dst: 'app/',
    src: 'src/'
};

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: PATH.dst
        }
    })
});

gulp.task('sass', function () {
    return gulp.src(PATH.src + 'scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(cssnano())
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(PATH.dst + 'css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () {
    return gulp.src(PATH.src + 'js/**/*.js' )
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('plugin.min.js'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(PATH.dst + 'js' ))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('imagemin', function() {
    return gulp.src(PATH.src + 'img/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(PATH.dst + 'img'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function() {
    gulp.watch(PATH.src + 'scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch(PATH.src + 'js/**/*.js', gulp.parallel('js'));
    gulp.watch(PATH.src + 'img/**/*', gulp.parallel('imagemin'));
    gulp.watch(PATH.dst + '**/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('sass', 'js', 'imagemin', 'browserSync', 'watch'));
