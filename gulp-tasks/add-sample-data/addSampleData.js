var mongoose = require('mongoose');
var Book = require('../../src/common/models/Books.js');

var datas = require('./datas.json');

module.exports = function (gulp) {
    gulp.task('add-sample-data', function () {
        var db = mongoose.connect('mongodb://localhost/library');
        console.log(datas);

        Book.remove({}, function () {
            Book.create(datas, function (err, datas) {
                console.log("Inserted " + datas.length + " books");
            })
        });
    });
};