var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет,
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    nodemon = require('gulp-nodemon');//Модуль для запуска node сервера

gulp.task('sass', function () { // Создаем таск Sass
    return gulp.src('public/sass/**/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true})) // Создаем префиксы
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('public/stylesheets'));// Выгружаем результата в папку app/css
});

gulp.task('scripts', function () {
    return gulp.src([ // Берем все необходимые библиотеки
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-route-segment/build/angular-route-segment.js',
        'angular_app/app.js',
        'angular_app/ctrls.js',
        'angular_app/route_config.js'
    ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify({mangle:false})) // Сжимаем JS файл
        .pipe(gulp.dest('public/javascripts')); // Выгружаем в папку app/js
});

gulp.task('css-libs', ['sass'], function () {
    return gulp.src('public/stylesheets/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('public/stylesheets')); // Выгружаем в папку app/css
});

gulp.task('watch', [ 'css-libs', 'scripts'], function () {
    gulp.watch('public/sass/**/*.sass', ['sass']);// Наблюдение за sass файлами в папке sass
    gulp.watch('public/stylesheets/**/*.css',['css-libs']);
    gulp.watch('public/javascripts/**/*.js',['scripts']);
});

gulp.task('clean', function () {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function () {
    return gulp.src('public/images/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images')); // Выгружаем на продакшен
});

gulp.task('start', function () {
    nodemon({
        script: 'bin/www'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});

gulp.task('build', ['clean', 'img', 'svg', 'sass', 'scripts'], function () {

    // var buildCss = gulp.src([ // Переносим библиотеки в продакшен
    //
    // ])
    //     .pipe(gulp.dest('dist/css'))
    //
    // var buildSvg = gulp.src('app/svg/**/*') // Переносим шрифты в продакшен
    //     .pipe(gulp.dest('dist/svg'))
    //
    // var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    //     .pipe(gulp.dest('dist/fonts'))
    //
    // var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    //     .pipe(gulp.dest('dist/js'))
    //
    // var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    //     .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('default', ['watch','start']);



