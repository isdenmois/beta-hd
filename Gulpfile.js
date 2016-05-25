const gulp = require('gulp');
const concat = require('gulp-concat');
var sftp = require('gulp-sftp');


// Deploy project to it-oblako.
gulp.task('deploy', function () {
  return gulp.src('dist/**')
    .pipe(sftp({
      host: 'it-oblako.ru',
      auth: 'keyMain',
      remotePath: '/var/www/initlab_user/data/www/dev-helpdesk.it-oblako.ru/beta'
    }));
});

gulp.task('default', ['deploy']);
