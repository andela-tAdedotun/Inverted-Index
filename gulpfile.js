const gulp = require('gulp');
const browserSync = require('browser-sync');

const reload = browserSync.reload;

gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: '/Users/andeladeveloper/Documents/Code/Checkpoints/Inverted-Index/src',
    },
  });

  gulp.watch('src/**/**', reload);
});
