const gulp = require('gulp');
const browserSync = require('browser-sync');

const reload = browserSync.reload;

gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: 'src',
    },
    port: process.env.PORT || 5000,
  });

  gulp.watch('src/**/**', reload);
});
