var gulp = require('gulp');

require('./gulp-tasks/add-sample-data/addSampleData.js')(gulp);
require('./gulp-tasks/build/build-app.js')(gulp);
require('./gulp-tasks/build/create-api-doc.js')(gulp);

gulp.task('default', ['add-sample-data', 'build-app-desktop', 'create-api-doc'], function () {

});