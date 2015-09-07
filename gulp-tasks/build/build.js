var NwBuilder = require('nw-builder');

module.exports = function (gulp) {
    gulp.task('build-app-desktop', function () {
        var nw = new NwBuilder({
            files: './desktop-app-using-node-webkit/**', // use the glob format
            platforms: ['win64'],
            forceDownload: false
        });

        nw.on('log',  console.log);

        nw.build().then(function () {
            console.log('all done!');
        }).catch(function (error) {
            console.error(error);
        });

    });
};