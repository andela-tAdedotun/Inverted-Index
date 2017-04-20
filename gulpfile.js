const gulp = require('gulp');
const browserSync = require('browser-sync');

const reload = browserSync.reload;

gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: 'src',
    },
  });

  gulp.watch('src/**/**', reload);
});
