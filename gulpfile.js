const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');
const concatCss = require('gulp-concat-css');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const imagemin  = require('gulp-imagemin')


const buildStyles = () => {
    return gulp.src('./src/styles/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
			cascade: false
		}))
      .pipe(concatCss('styles.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./dist/style'));
}

const buildJs = () => {
    return gulp.src('./src/script/*.js')
        .pipe(concat('script.js'))
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            },
            compress:true}))
        
        .pipe(gulp.dest('./dist/script'));

}

gulp.task('buildImg',()=>{
    return gulp.src('src/img/**')
        .pipe(imagemin({
            progressive:true
        }))
        .pipe(gulp.dest('./dist/img/'))

})

gulp.task('buildFonts', ()=> {
    return gulp.src('src/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'))
  })

gulp.task('cleanDist', ()=> {
    return gulp.src('./dist/*')
        .pipe(clean({ force: true }));
})


gulp.task('server', (cb)=>{
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
	cb();
})

gulp.task('watchStyles', ()=>{
    gulp.watch('./src/styles/**/*.scss', buildStyles).on('change', browserSync.reload) 
})

gulp.task('watchScripts', ()=>{
    gulp.watch('./src/script/*.js', buildJs).on('change', browserSync.reload)
})

exports.dev = gulp.parallel('server', 'watchStyles', 'watchScripts')
exports.build = gulp.series('cleanDist', buildStyles, buildJs, 'buildImg', 'buildFonts');

