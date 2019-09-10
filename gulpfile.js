var gulp = require('gulp');
var uglify = require('gulp-uglify');
var css = require('gulp-clean-css');
var html = require('gulp-htmlmin');
//压缩需要的插件，引入

gulp.task('jscompress', function() {
    return gulp.src('./src/*.js') //获取文件流
        .pipe(uglify()) //执行压缩
        .pipe(gulp.dest('dist/js')) //输出到文件
});
//压缩js

gulp.task('cssd', function() {
        gulp.src('./src/*.css')
            .pipe(css())
            .pipe(gulp.dest('dist/css'))
    })
    //压缩css

gulp.task('htmld', function() {
        gulp.src('*.html')
            .pipe(html())
            .pipe(gulp.dest('dist/html'))
    })
    //压缩html

gulp.task('yasuo', ['jscompress', 'cssd', 'htmld'])
    //压缩所有