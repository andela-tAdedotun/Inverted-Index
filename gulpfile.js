var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', function() {
  browserSync.init({
    server: {
      baseDir: '/Users/andeladeveloper/Documents/Code/Checkpoints/Inverted-Index/src',
    }
  });

  gulp.watch('src/**/**', reload);
});
