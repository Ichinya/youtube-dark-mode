"use strict";

var path = {
    build: {
        html: 'dist/',
        js: 'dist/scripts',
        img: 'dist/img',
        local: 'dist/_locales',
    },
    src: {
        html: 'src/*.html',
        js: 'src/scripts/**/*.js',
        img: 'src/img/**/*.*',
        local: 'src/_locales/**/*.*'
    },
    clean: "dist/**"
};


const gulp = require('gulp')
const {series, parallel} = gulp
const plumber = require('gulp-plumber')
const terser = require('gulp-terser')
// const autoprefixer = require('gulp-autoprefixer')
// const cleanCSS = require('gulp-clean-css') // плагин для минимизации CSS
const del = require("del")
// const shorthand = require('gulp-shorthand')
const zip = require('gulp-zip');

const js = () => {
    return gulp.src(path.src.js) // получим файл main.js
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(terser()) // минимизируем js
        .pipe(gulp.dest(path.build.js)) // положим готовый файл
}

const copy_img = () => {
    return gulp.src(path.src.img) // получим
        .pipe(gulp.dest(path.build.img)) // выгружаем в build
}
const copy_local = () => {
    return gulp.src(path.src.local) // получим
        .pipe(gulp.dest(path.build.local)) // выгружаем в build
}

const html = () => {
    return gulp.src(path.src.html) // получим
        .pipe(gulp.dest(path.build.html)) // выгружаем в build
}
const copy_manifest = () => {
    return gulp.src('src/manifest.json') // получим
        .pipe(gulp.dest('dist/')) // выгружаем в build
}

function clean() {
    return del(path.clean, {force: true});
}

function pack() {
    return gulp.src('dist/**/*')
        .pipe(zip('extension.zip'))
        .pipe(gulp.dest('./'))
}

function del_zip() {
    return del('extension.zip', {force: true})
}

exports.zip = series(del_zip, pack)


exports.build = series(
    parallel(clean, del_zip), parallel(js, copy_img, html, copy_local, copy_manifest), pack
)
