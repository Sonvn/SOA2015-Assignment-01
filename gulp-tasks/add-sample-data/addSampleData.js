var mongoose = require('mongoose');
var Book = require('../../src/common/models/Books.js');
var User = require('../../src/common/models/Users.js');

var book_datas = require('./book_datas.json');
var user_datas = require('./user_datas.json');

module.exports = function (gulp) {
    gulp.task('add-sample-data', function () {
        var db = mongoose.connect('mongodb://localhost/library');

        Book.remove({}, function () {
            Book.create(book_datas, function (err, datas) {
                console.log("Inserted " + datas.length + " books");
            })
        });

        User.remove({}, function () {
            User.create(user_datas, function (err, datas) {
                console.log("Inserted " + datas.length + " users");
            })
        });
    });
};