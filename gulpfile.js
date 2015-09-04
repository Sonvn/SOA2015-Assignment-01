var gulp = require('gulp');

require('./gulp-tasks/add-sample-data/addSampleData.js')(gulp);

gulp.task('default', ['add-sample-data'], function () {

});