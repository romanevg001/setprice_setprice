const gulp          = require('gulp');
const sass          = require('gulp-sass');
const autoprefix    = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const clean         = require('gulp-clean-css');
const notify        = require('gulp-notify');
const gulpIf        = require('gulp-if');
const sourcemaps    = require('gulp-sourcemaps');
const del           = require('del');
const browserSync   = require('browser-sync').create();
const config        = require('./config');
const path          = require('path');
const webpack       = require('webpack');
const merge         = require('merge-stream');

var isDevelopment = false;

gulp.task('server', function(){
    browserSync.init(config.tasks.browserSync);
    browserSync.watch(config.root.dest).on('change',function(){
        browserSync.reload();
    })
});

gulp.task('sass',function(){

    return gulp.src(path.resolve(config.root.src, config.tasks.css.src, "**/*.*"))
        .pipe(gulpIf(isDevelopment,sourcemaps.init()))
        .pipe(sass())
    //    .on('error',notify.onError())
        .pipe(autoprefix())
        .pipe(clean())
        .pipe(gulpIf(isDevelopment,sourcemaps.write()))
        .on('error',(er)=>{
            console.log(`error: ${er.lineNumber}: ${er.fileName}: ${er.message}`);
        })
        .pipe(gulp.dest(path.resolve(config.root.dest,config.tasks.css.dest)));
        //.pipe(function(){
        //    browserSync.reload();
        //});

});

var webpackConfig = {
    context: path.resolve(config.root.src, config.tasks.js.src),
    entry:  {
        index: "./index"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(config.root.dest, config.tasks.js.dest),
        publicPath: config.root.dest
    },

    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};

gulp.task('js', function(callback) {
    var initialCompile = false;
    webpack(webpackConfig).watch(200, function(err, stats) {

   //     browserSync.reload();
        // On the initial compile, let gulp know the task is done
        if(!initialCompile) {
            initialCompile = true;
            callback()
        }
    })
});

gulp.task('copy',function(){
    return gulp.src(path.resolve(config.root.src, "**/*.{html,ico}"))
        .pipe(gulp.dest(config.root.dest));
});

gulp.task('watch', function(){
    gulp.watch([path.resolve(config.root.src, config.tasks.css.src) + '**/*.*'], gulp.series('sass'));
    //gulp.watch([opts.enter + opts.js + "**/*.*"], gulp.series('js'));
    gulp.watch([path.resolve(config.root.src, "**/*.html")], gulp.series('copy'));
    //gulp.watch([opts.img + "**/*.*"], gulp.series('image','other'));
    //gulp.watch([opts.enter + opts.js+ 'lib/**/*.*'], gulp.series('lib'));
    //gulp.watch([opts.enter + 'res/**/*.*'], gulp.series('res'));
    //gulp.watch([opts.enter + 'model/**/*.*'], gulp.series('model'));
    //gulp.watch([opts.enter + 'fonts/**/*.*'], gulp.series('fonts'));

});

gulp.task('clean',function(){
    return del(config.root.dest);
});

gulp.task('make',gulp.series('sass','js','copy',gulp.parallel('server','watch')));

gulp.task('productionSetting',function(){

});
gulp.task('developmentSetting',function(){
    isDevelopment = true;
    webpackConfig.devtool = 'source-map';
    webpack.debug = true;
    var pipe = gulp.src(config.root.src);
    return merge.call(this, pipe);
});

gulp.task('production', gulp.series('clean','productionSetting','make'));
gulp.task('default', gulp.series('clean','developmentSetting','make'));