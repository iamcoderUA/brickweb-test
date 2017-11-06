const
    gulp         = require('gulp'),
    pug          = require('gulp-pug'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync').create(),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify'),
    del          = require('del'),

    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    csso         = require('gulp-csso'),
    imagemin     = require('gulp-imagemin'),
    normalize    = require('node-normalize-scss'),
    rename       = require('gulp-rename'),      
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify');

const paths = {
    root: './prod',

    pug:      {
                src:  'src/pug/**/*.pug',      
                pages:  'src/pug/pages/*.pug',      
                dest:   'prod/',
    },
    styles:   {
                src: 'src/scss/**/*.scss',
                dest: 'prod/css/',
    },
    scripts:  {
                src: 'src/js/*.js',
                dest: 'prod/js/',
    },
    images:   {
                src: 'src/img/{bg,content,icons}/**/*',
                dest: 'prod/img/',
    },
    fonts:    {
                src: 'src/fonts/**/*.*',
                dest: 'prod/fonts/',
    },
};

// Development 
function templates() {
return gulp.src(paths.pug.pages)
    .pipe(plumber())
    .pipe(pug({ pretty: '\t' }))
    .pipe(notify('Template success'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.pug.dest));
}

function scss() {
return gulp.src('./src/scss/main.scss')
    .pipe(plumber())
    .pipe(sass({ includePaths: normalize.includePaths }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.init())
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(notify('Style success'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(notify('Scripts success'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.scripts.dest));
}

function imgMin() {
return gulp.src(paths.images.src)
    .pipe(plumber())
    .pipe(imagemin())        
    .pipe(plumber.stop())
    .pipe(notify('Image success'))     
    .pipe(gulp.dest(paths.images.dest));
}

function fonts() {
return gulp.src(paths.fonts.src)
    .pipe(notify('Fonts success'))
    .pipe(gulp.dest(paths.fonts.dest));
}

function clean() {
    return del(paths.root);
}

function watch() {
gulp.watch(paths.pug.src, templates);
gulp.watch(paths.styles.src, scss);
gulp.watch(paths.scripts.src, scripts);
gulp.watch(paths.images.src, imgMin);
gulp.watch(paths.fonts.src, fonts);
}

function server() {
browserSync.init({
server: paths.root,
});
browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// Exports
// exports.sprites = sprites;
exports.templates      = templates;
exports.scss           = scss;
exports.scripts        = scripts;
exports.imgMin         = imgMin;
exports.fonts          = fonts;
exports.clean          = clean;
exports.watch          = watch;

// Tasks
gulp.task('build', gulp.series(
clean,
gulp.parallel(templates, scss, scripts, imgMin, fonts),
));

gulp.task('default', gulp.series(
gulp.parallel(templates, scss, scripts, imgMin),
gulp.parallel(watch, server),
));
