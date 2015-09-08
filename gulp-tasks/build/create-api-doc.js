var apidoc = require('gulp-apidoc');

module.exports = function(gulp){
    gulp.task('create-api-doc', function(){
        apidoc.exec({
            src: ["src/backend/"],
            dest: "api-doc/"
        });
    });
};
