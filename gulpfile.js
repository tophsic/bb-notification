var coffee = require('coffee-script/register');
var gulp = require('gulp');
var gutil = require('gulp-util');
var wrap = require('gulp-wrap');
var define = require('gulp-wrap-define');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var compass = require('gulp-compass');
var lazypipe = require('lazypipe');
var escape = require('js-string-escape');
var queue = require('streamqueue');
var path = require('path');



gulp.task('watch', function() {
    gulp.watch([
        './src/*.js',
        './src/**/*.js',
        './src/templates/*.html'
    ], ['notification']);

    gulp.watch(['./src/sass/*.scss'], ['styles']);
    gulp.watch(['./spec/**/*.js'], ['spec']);
});



gulp.task('default', [
    'vendors',
    'tests',
    'spec',
    'notification',
    'styles-tests',
    'styles'
]);



gulp.task('vendors', function() {
    queue({ objectMode: true },
        // module loader
        gulp.src('./bower_components/commonjs-require-definition/require.js'),

        // lodash aliased to underscore
        gulp.src('./bower_components/lodash/dist/lodash.js')
            .pipe(wrap({ src: './gulp/commonjs-wrapper.js' }, { path: path, name: 'underscore' })),

        // commonjs modules
        gulp.src([
            './bower_components/jquery/jquery.js',
            './bower_components/backbone/backbone.js',
            './bower_components/humane-js/humane.js'
        ]).pipe(wrap({ src: './gulp/commonjs-wrapper.js' }, { path: path })),

        // amd modules
        gulp.src([
            './bower_components/jquery-file-upload/js/vendor/jquery.ui.widget.js',
            './bower_components/jquery-file-upload/js/jquery.iframe-transport.js',
            './bower_components/jquery-file-upload/js/jquery.fileupload.js',
            './bower_components/jquery-file-upload/js/jquery.fileupload-process.js',
            './bower_components/jquery-file-upload/js/jquery.fileupload-image.js',
            './bower_components/jquery-file-upload/js/jquery.fileupload-audio.js',
            './bower_components/jquery-file-upload/js/jquery.fileupload-video.js',
            './bower_components/jquery-file-upload/js/jquery.fileupload-validate.js',
            './bower_components/jquery-file-upload/js/jquery.fileupload-ui.js'
        ]).pipe(wrap({ src: './gulp/amd-wrapper.js' }, { path: path })),

        // amd modules in jQuery context
        gulp.src([
            './bower_components/blueimp-tmpl/js/tmpl.js',
            './bower_components/blueimp-load-image/js/load-image.js',
            './bower_components/blueimp-load-image/js/load-image-meta.js',
            './bower_components/blueimp-load-image/js/load-image-exif.js',
            './bower_components/blueimp-load-image/js/load-image-ios.js',
            './bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.js'
        ]).pipe(wrap({ src: './gulp/amd-wrapper.js' }, { path: path, context: 'jquery' }))
    ).pipe(build('vendors', './'));
});



gulp.task('tests', function() {
    gulp.src([
        './bower_components/mocha/mocha.js',
        './bower_components/chai/chai.js',
        './bower_components/sinon-chai/lib/sinon-chai.js',
        './bower_components/sinon/lib/sinon.js',
        './bower_components/sinon/lib/sinon/**/*.js'
    ])
        .pipe(gulp.dest('./web/js'));
});



gulp.task('notification', function() {
    queue({ objectMode: true },
        gulp.src([
            './src/js/notification.js',
            './src/js/notification/**/*.js'
        ]),
        gulp.src('./src/js/notification/templates/*.html')
            .pipe(wrap('module.exports = "<%= escape(contents) %>"', {}, {
                imports: {
                    escape: escape
                }
            }))
        )
        .pipe(define({
            root: './src/js',
            define: 'require.register'
        }))
        .pipe(build('notification', '.'));
});

gulp.task('spec', function() {
    queue({ objectMode: true },
        gulp.src([
            './spec/**/*.js'
        ]))
        .pipe(build('specs', '.'));
});



gulp.task('styles', function() {
    gulp.src('./src/sass/*.scss')
        .pipe(compass({
            css: './web/css/',
            sass: './src/sass',
            require: ['susy']
        }))
        .pipe(gulp.dest('./web/css'));
    gulp.src([
        './bower_components/humane-js/themes/jackedup.css',
    ])
        .pipe(concat('vendors.css'))
        .pipe(gulp.dest('./web/css'));
});



gulp.task('styles-tests', function() {
    gulp.src([
        './bower_components/mocha/mocha.css',
    ])
        .pipe(concat('tests.css'))
        .pipe(gulp.dest('./web/css'));
});



var build = function(name, path) {
    var builder = lazypipe()
        .pipe(concat, name + '.js')
        .pipe(gulp.dest, path + '/web/js')
        .pipe(rename, name + '.min.js')
        .pipe(uglify)
        .pipe(gulp.dest, path + '/web/js');

    return builder();
}
