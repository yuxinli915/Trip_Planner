const { src, dest, watch, series } = require(`gulp`);
const browserSync = require(`browser-sync`).create();
const cleanCSS = require(`gulp-clean-css`);
const babel = require(`gulp-babel`);
const uglify = require(`gulp-uglify`);
const htmlmin = require(`gulp-htmlmin`);

function compressCSS(done) {
  src(`src/css/*.css`)
    .pipe(cleanCSS())
    .pipe(dest(`dist/css`));
  done();
}

function compressJS(done) {
  src(`src/js/*.js`)
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(dest(`dist/js`));
  done();
}

function compressHTML(done) {
  src(`src/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(`dist`));
  done();
}

function watching() {
  watch(`src/css/*.css`, compressCSS);
  watch(`src/js/*.js`, compressJS);
  watch(`src/index.html`, compressHTML);
}

function server(done) {
  browserSync.init({
    files: [`dist/css/style.css`, `dist/js/app.js`, `dist/index.html`],
    server: { baseDir: `./dist` }
  });
  done();
}

exports.default = series(compressCSS, compressHTML, compressJS, server, watching);