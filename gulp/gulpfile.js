var gulp = require( "gulp" );
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cssClean = require("gulp-clean-css");
var htmlMin = require("gulp-htmlmin");
var livereload = require('gulp-livereload');
const { watch } = require('gulp');

//  创建一个压缩js的gulp的任务
gulp.task( "js",function(){
    return gulp.src("src/js/*.js")
        .pipe(concat('build.js'))
        .pipe(gulp.dest('dist/js/'))

        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/js/'))
        .pipe(livereload())
} );
//  创建一个压缩css的gulp的任务
gulp.task("css",function(){
    return gulp.src('src/css/*.css')
        .pipe(concat("build.css"))
        .pipe(rename({suffix:'.min'}))
        .pipe(cssClean({compatibility:'ie8'}))
        .pipe(gulp.dest("dist/css/"))
        .pipe(livereload())
})

gulp.task("html",function(){
    return gulp.src('index.html')
        .pipe(htmlMin({collapseWhitespace:true}))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload())
})

// 注册监视任务
// gulp.task('watch',['default'],function(){
//     // 开启监听
//     livereload.listen();
//     // 确定监听的目标以及绑定的 任务
//     gulp.watch('src/js/*.js',['js']);
//     gulp.watch('src/css/*.css',['css'])
// })


// 注册一个默认任务
gulp.task('default',gulp.series(gulp.parallel('css','js','html')));