var express = require("express");
var Book = require('../../common/models/Books.js');
var User = require('../../common/models/Users.js');

var router = express.Router();

module.exports = function (app, staticConfig) {

    router.post("/admin/authorize", function (req, res) {

        var admin = req.body;
        admin.role = "admin";

        User.authorize(admin, function (err, admin) {
            if (admin) {
                var returnUser = {
                    role: admin.role,
                    username: admin.username,
                    display_name: admin.display_name
                };

                res.json({ok: 1, user: returnUser});
            } else {
                res.json({ok: 0});
            }
        })
    });

    router.get("/books", function (req, res) {
        Book.listBook({}, function (err, books) {
            res.json(books);
        })
    });

    router.post("/book/insert", function (req, res) {
        var newBook = new Book(req.body);

        newBook.save(function (err) {
            if(!err) {
                res.json({ok: 1, book: newBook});
            } else {
                res.json({ok: 0});
            }
        });
    });

    router.put("/book/update/:book_id", function (req, res) {

        var book_id = req.params["book_id"];
        var newInfo = req.body;

        delete newInfo._id;

        Book.updateOneBook(book_id, newInfo, function (err, book) {
            if(book) {
                newInfo._id = book_id;
                res.json({ok: 1, book: newInfo});
            } else {
                res.json({ok: 0});
            }
        })
    });

    router.delete("/book/delete/:book_id", function (req, res) {
        Book.findOneAndRemove({ _id: req.params.book_id }, function(err, book) {
            if(book) {
                res.json({ok: 1});
            } else {
                res.json({ok: 0});
            }
        });
    });

    app.use("/api", router);
};