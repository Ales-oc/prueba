require("gulp");
const { series, parallel } = require('gulp');
const { src, dest } = require('gulp');
const del = require('delete');
const sass = require('gulp-dart-sass');
const sassdoc = require('sassdoc');
const imgmin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify')
const rename = require('gulp-rename');

const eliminarDist = (cb)=>{
    del(['./dist'], (err, deleted)=>{
        if (err) {
            console.log(err);
            console.log(deleted);
        }
    })
    cb();
}

const compilarSass = ()=>{
    return src("./src/sass/style.scss")
    .pipe(sass())
    .pipe(dest('./src/css/'));
}

const generarSassDoc = ()=>{
    return src("./src/sass/style.scss")
    .pipe(sassdoc());
}

const optimizarImg = ()=> {
        return src('src/img/*')
		.pipe(imgmin())
		.pipe(dest('dist/images'));
}

const optimizarHtml = ()=> {
    return src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true, collapseInlineTagWhitespace: true, removeComments:true}))
    .pipe(rename({suffix:'.min'}))
    .pipe(dest('dist'));
}

const optimizarCss = ()=> {
    return src('src/css/*.css')
    .pipe(cssmin({}))
    .pipe(rename({suffix:'.min'}))
    .pipe(dest('dist/css'));
}

const optimizarJs = ()=> {
    return src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix:'.ugly'}))
    .pipe(dest('dist/js'));
}

const optimizarSrc = ()=>{
    parallel(generarSassDoc, optimizarImg, optimizarHtml, optimizarCss, optimizarJs);
}

// exports.eliminarDist = eliminarDist;
// exports.compilarSass = compilarSass;
// exports.generarSassDoc = generarSassDoc;
// exports.optimizarImg = optimizarImg;
// exports.optimizarCss = optimizarCss;
// exports.optimizarHtml = optimizarHtml;
// exports.optimizarJs = optimizarJs;
// exports.optimizarSrc = optimizarSrc;
exports.build = series(compilarSass, parallel(generarSassDoc, optimizarImg, optimizarHtml, optimizarCss, optimizarJs));