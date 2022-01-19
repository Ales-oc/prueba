//Eliminar carpeta dist
//Compilar scss
//->//Renombrar css 
//->//Guardar en dist/css
//Generar sassdoc
//->//Guardarla en /dist/docs/
//Guardar img en dist/img
//Guardar html en dist

require("gulp");
const { series, parallel } = require('gulp');
const { src, dest } = require('gulp');
const del = require('delete');
const rename = require('gulp-rename');
const dart = require('gulp-dart-sass');
const sassdoc = require('sassdoc');
const cssmin = require('gulp-cssmin');
const processhtml = require('gulp-processhtml');

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
    return src('./scss/ejercicio.scss')
    .pipe(dart({outputStyle: 'compressed'}))
    .pipe(rename({
        basename: 'styles',
        suffix: '.min'
    }))
    .pipe(dest('./dist/css/'))
}

const generarSassDoc = ()=>{
    return src('./scss/*.scss')
    .pipe(sassdoc({
        dest:'./dist/docs/'
    }))
}

const moverImg = ()=>{
    return src('./img/*jpg')
    .pipe(dest('./dist/img'))
}

const moverHtml = ()=>{
    return src('./index.html')
    .pipe(processhtml())
    .pipe(dest('./dist'))
}

exports.default = series(eliminarDist,parallel(compilarSass,generarSassDoc,moverImg,moverHtml))
exports.eliminarDist = eliminarDist;