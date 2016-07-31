var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function() {
	nodemon({
		script: 'bot.js',
		ext: 'json js'
	}).on('restart', function(){
	})
})
