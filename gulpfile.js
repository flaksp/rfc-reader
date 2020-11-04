const fs = require('fs');
const del = require('del');
const gulp = require('gulp');
const gulpJsonEditor = require('gulp-json-editor');
const gulpJsonMinify = require('gulp-jsonminify');
const gulpTerser = require('gulp-terser');
const npmPackage = require('./package.json');

const ICON_NAME = 'ic_find_in_page_black_48dp.png';

gulp.task('process-manifest', () => gulp.src('./src/manifest.json')
  .pipe(gulpJsonEditor({
    author: npmPackage.author.name,
    browser_specific_settings: process.env.FIREFOX_EXTENSION_ID === undefined ? undefined : {
      gecko: {
        id: process.env.FIREFOX_EXTENSION_ID,
        strict_min_version: '48.0',
      },
    },
    description: npmPackage.description,
    homepage: npmPackage.homepage,
    icons: {
      96: ICON_NAME,
    },
    version: `${process.env.APP_VERSION}.${process.env.BUILD_NUMBER}`,
    version_name: `${process.env.APP_VERSION} build ${process.env.BUILD_NUMBER}`,
  }))
  .pipe(gulpJsonMinify())
  .pipe(gulp.dest('./dist')));

gulp.task('process-js', () => gulp.src('./src/*.js')
  .pipe(gulpTerser())
  .pipe(gulp.dest('./dist')));

gulp.task('process-icon', () => gulp.src(`./node_modules/material-design-icons/action/2x_web/${ICON_NAME}`)
  .pipe(gulp.dest('./dist')));

gulp.task('recreate-dist', async (done) => {
  await del([
    './dist',
  ]);

  fs.mkdirSync('./dist');

  done();
});

gulp.task('default', gulp.series(
  'recreate-dist',
  gulp.parallel(
    'process-manifest',
    'process-js',
    'process-icon',
  ),
));
