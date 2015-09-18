var download = require("gulp-download");
var unzip = require("gulp-unzip");
var zip = require("gulp-zip");
var rename = require("gulp-rename");
var $q = require("q");

var platform = {
    win32: {
        file_name: "nwjs-v0.12.3-win-ia32.zip"
    },
    win64: {
        file_name: "nwjs-v0.12.3-win-x64.zip",
        build: function (gulp) {
            var file = platform[config_build.platform].file_name;
        }
    },
    osx32: {
        file_name: "nwjs-v0.12.3-osx-ia32.zip"
    },
    osx64: {
        file_name: "nwjs-v0.12.3-osx-x64.zip"
    },
    linux32: {
        file_name: "nwjs-v0.12.3-linux-ia32.tar.gz"
    },
    linux64: {
        file_name: "nwjs-v0.12.3-linux-x64.tar.gz"
    }
};

var config_build = {
    src_app: "./desktop-app-using-node-webkit",
    server_url: "http://dl.nwjs.io/v0.12.3/",
    platform: "win64",
    cache: "./cache/"
};

var dowload_file = function (file) {
    var defer = $q.defer();
    var url = config_build.server_url + file;

    download(url)
        .pipe(gulp.dest(config_build.cache))
        .on("end", function() {
            defer.resolve();
        });

    return defer.promise;
};

var unzip_file = function (gulp) {
    var defer = $q.defer();
    var file = platform[config_build.platform].file_name;

    gulp.src(config_build.cache + file)
        .pipe(unzip())
        .pipe(gulp.dest('./build'))
        .on("end", function() {
            defer.resolve();
        });

    return defer.promise;
};

var zip_src = function (gulp) {


};

module.exports = function(gulp){

    gulp.task('unzip-file', function(){
        unzip_file(gulp);
    });

};