const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    webpack = require('webpack-stream'),
    gulpif = require('gulp-if')


/* === Красивое отображение ошибок === */
const notify = require('gulp-notify')


function emit_end(err) {
    this.emit('end')
}
/* --- Красивое отображение ошибок --- */

/* === Файлы проекта === */

const conf = {
    src: './app',
    dest: './build'
}

const html_files = [
    './app/**/*.html',
]
const css_files = [
    './app/styles/**/*.css',
]
const js_files = [
    './app/scripts/**/*.js',
    '!./app/scripts/**/*.map'
]

var isDev = false // Прод

// let isDev = true // Дев

var isProd = !isDev

var webpack_config = {
    output: {
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }]
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-source-map' : 'none',
}

/* --- Файлы проекта --- */

// Пользовательские скрипты проекта

function browser_sync() {
    browserSync({
        server: {
            baseDir: conf.dest // './build'
        },
        notify: false,
        open: false,
        reloadOnRestart: true,
        cors: true,
    })
}

function js() {
    return gulp.src(conf.src + '/scripts/app.js')
        .pipe(webpack(webpack_config).on("error", notify.onError(function(error) {
            return "Error webpack: " + error.message;
        })).on('error', emit_end))
        .pipe(gulpif(isDev, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(isDev, gulp.dest(conf.dest + '/scripts')))
        .pipe(gulpif(isProd, gulp.dest(conf.dest)))
        .pipe(gulpif(isDev, sourcemaps.write(conf.dest + '/scripts/maps')))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(livereload())
}

function html() {
    return gulp.src(html_files)
        .pipe(gulp.dest(conf.dest))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(livereload())
}

function css() {
    return gulp.src(css_files)
        .pipe(gulp.dest(conf.dest + '/styles/'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(livereload())
}

gulp.task('watch', ['setDev', 'build', 'browser_sync'], function() {
    livereload.listen()

    gulp.watch(html_files, ['html'])
    gulp.watch(js_files, ['js'])
    gulp.watch(css_files, ['css'])
})

gulp.task('build', ['removedist', 'livereload2build', 'js'], function() {

})

function livereload2build() {
    if (isDev) {
        return gulp.src([
                conf.src + '/livereload.js',
                conf.src + '/index.html',
            ])
            .pipe(gulp.dest(conf.dest))
    }
}

function removedist() {
    try {
        return del.sync(conf.dest)
    } catch (err) {}
}

function setDev() {
    isDev = true
    isProd = false
    webpack_config.mode = isDev ? 'development' : 'production'
    webpack_config.devtool = isDev ? 'eval-source-map' : 'none'
}


gulp.task('browser_sync', browser_sync)
gulp.task('js', js)
gulp.task('html', html)
gulp.task('css', css)
gulp.task('removedist', removedist)
gulp.task('livereload2build', livereload2build)
gulp.task('setDev', setDev)


gulp.task('default', ['watch'])