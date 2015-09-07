var gulp = require('gulp');

require('./gulp-tasks/add-sample-data/addSampleData.js')(gulp);
require('./gulp-tasks/build/build.js')(gulp);

gulp.task('default', ['add-sample-data', 'build-app-desktop'], function () {

});