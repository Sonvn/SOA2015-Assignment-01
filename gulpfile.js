var gulp = require('gulp');

require('./gulp-tasks/add-sample-data/addSampleData.js')(gulp);
require('./gulp-tasks/build/create-api-doc.js')(gulp);