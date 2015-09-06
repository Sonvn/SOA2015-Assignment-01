var mongoose = require('mongoose');
var Book = require('../../src/common/models/Books.js');
var User = require('../../src/common/models/Users.js');
var $q = require('q');

var book_datas = require('./book_datas.json');
var user_datas = require('./user_datas.json');

module.exports = function (gulp) {
    gulp.task('add-sample-data', function () {
        var db = mongoose.connect('mongodb://localhost/library');

        var addBooks = function () {
            var defer = $q.defer();
            Book.remove({}, function () {
                Book.create(book_datas, function (err, datas) {
                    console.log("Inserted " + datas.length + " books");
                    defer.resolve();
                })
            });
            return defer.promise;
        };

        var addUsers = function () {
            var defer = $q.defer();
            User.remove({}, function () {
                User.create(user_datas, function (err, datas) {
                    console.log("Inserted " + datas.length + " users");
                    defer.resolve();
                })
            });
            return defer.promise;
        };

        $q.all([addBooks(), addUsers()]).then(function () {
            console.log("done adding sample data");
            db.connection.close();
        })
    });
};