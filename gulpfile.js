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

// gulp.task('reload', ['nodemon'], () => {
//   browserSync.init(null, {
//     proxy: 'http://localhost:3000',
//     port: 5000,
//     files: ['public/**/**'],
//   });
// });
