var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var concat = require('gulp-concat'); 
var babel = require('gulp-babel');


// Set the banner content
var banner = ['/*!\n',
    ' * Copyright 2017 Vincent V. licensed under MIT\n',
    ' * Template : Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src(['less/freelancer.less','less/custom.less'])
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src(['css/freelancer.css','css/custom.css'])
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))

});

// typescript
var failed = false;
var tsProject = ts.createProject('tsconfig.json');
gulp.task('ts', function () {
    var tsResult = gulp.src('ts/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        //gracefully report error instead of breaking watch
        //https://github.com/ivogabe/gulp-typescript/issues/295

        .on("error", function () { failed = true; })
        .on("finish", function () { /*failed && process.exit(1);*/ });

   
    return tsResult.js

    .pipe(sourcemaps.write({
      // Return relative source map root directories per file.
      sourceRoot: function (file) {
        var sourceFile = path.join(file.cwd, file.sourceMap.file);
        return path.relative(path.dirname(sourceFile), file.cwd);
      }
    }))

    // fixme : create a map with the minified version of the ts
    .pipe(uglify())
    .pipe(header(bannercustom, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
        
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

//jsx to js
gulp.task("jsx", function(){
    return gulp.src("jsx/*.jsx").
        pipe(sourcemaps.init()).
        pipe(babel({
            plugins: ['transform-react-jsx'],
            presets: ["react-native"]
        })).
        pipe(sourcemaps.write('.')).
        pipe(gulp.dest("jsx"));
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src(['js/*.js','ts/*.js','jsx/*.js','!jsx/hello.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('concat-js', function() {
    return gulp.src(['js/*.js','ts/*.js','jsx/*.js','!jsx/hello.js'])
        .pipe(concat('scripts.js'))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});




// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
})

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js', 'jsx', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'jsx', 'concat-js'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    gulp.watch('ts/*.ts', ['minify-js']);
    gulp.watch('jsx/*.jsx', ['jsx']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('jsx/*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
