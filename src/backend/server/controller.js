var express = require("express");
var path    = require("path");
var Book = require('../../common/models/Books.js');
var User = require('../../common/models/Users.js');

var router = express.Router();

module.exports = function (app, staticConfig, multer) {

    /**
     * @api {post} /admin/authorize  Login admin user
     * @apiName Login
     * @apiGroup Security
     * @apiParamExample {json} Request-Example:
     * {
     *      username: "admin",
     *      password: "123qwe"
     * }
     * @apiSuccessExample {json} Success-Response:
     * {
     *      ok: 1,
     *      user: {
     *          role: "admin",
     *          username: "admin",
     *          display_name: "Admin"
     *      }
     * }
     * @apiErrorExample {json} Error-Response:
     * {
     *      ok: 0
     * }
     *
     */
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

    /**
     * @api {get} /books  Get all books
     * @apiName Get Books
     * @apiGroup Book
     * @apiSuccessExample {json} Success-Response:
     * [
     *      {
     *           "_id" : ObjectId("55ec708172004b8c088cac12"),
     *           "created_at" : ISODate("2015-09-06T16:57:37.679Z"),
     *           "available" : 10,
     *           "number" : 10,
     *           "image" : "http://it-ebooks.info/images/ebooks/14/learning_pandas.jpg",
     *           "description" : "This learner's guide..."
     *      }
     * ]
     *
     */
    router.get("/books", function (req, res) {
        Book.listBook({}, function (err, books) {
            res.json(books);
        })
    });

    /**
     * @api {post} /book/insert  Insert a new book
     * @apiName Insert Book
     * @apiGroup Book
     * @apiParamExample {json} Request-Example:
     * {
     *      "number" : 10,
     *      "image" : "http://it-ebooks.info/images/ebooks/14/learning_pandas.jpg",
     *      "description" : "This learner's guide...",
     *      "title" : "Learning pandas"
     * }
     * @apiSuccessExample {json} Success-Response:
     * {
     *      ok: 1,
     *      book: {
     *          "_id" : ObjectId("55ec708172004b8c088cac12"),
     *           "created_at" : ISODate("2015-09-06T16:57:37.679Z"),
     *           "available" : 10,
     *           "number" : 10,
     *           "image" : "http://it-ebooks.info/images/ebooks/14/learning_pandas.jpg",
     *           "description" : "This learner's guide...",
     *           "title" : "Learning pandas"
     *      }
     * }
     * @apiErrorExample {json} Error-Response:
     * {
     *      ok: 0
     * }
     *
     */
    router.post("/book/insert",
        multer({
            dest: "./uploads",
            rename: function (fieldname, filename) {
                return filename + "_" + Date.now();
            }
        }),
        function (req, res) {
            var newBook = new Book(req.body);

            if(newBook.image_type == "file") {
                newBook.image = req.files.file.name;
            }

            newBook.save(function (err) {
                if(!err) {
                    res.json({ok: 1, book: newBook});
                } else {
                    res.json({ok: 0});
                }
            });
        }
    );

    /**
     * @api {post} /book/update/:book_id  Update a book
     * @apiName Update Book
     * @apiGroup Book
     * @apiParamExample {json} Request-Example:
     * {
     *      "number" : 10,
     *      "image" : "http://it-ebooks.info/images/ebooks/14/learning_pandas.jpg",
     *      "description" : "This learner's guide...",
     *      "title" : "Learning pandas"
     * }
     * @apiSuccessExample {json} Success-Response:
     * {
     *      ok: 1,
     *      book: {
     *          "_id" : ObjectId("55ec708172004b8c088cac12"),
     *           "created_at" : ISODate("2015-09-06T16:57:37.679Z"),
     *           "available" : 10,
     *           "number" : 10,
     *           "image" : "http://it-ebooks.info/images/ebooks/14/learning_pandas.jpg",
     *           "description" : "This learner's guide..."
     *      }
     * }
     * @apiErrorExample {json} Error-Response:
     * {
     *      ok: 0
     * }
     *
     */
    router.post("/book/update/:book_id",
        multer({
            dest: "./uploads",
            rename: function (fieldname, filename) {
                return filename + "_" + Date.now();
            }
        }),
        function (req, res) {

            var book_id = req.params["book_id"];
            var newBook = req.body;

            if(newBook._id) {
                delete newBook._id;
            }

            if(req.files.file) {
                console.log(req.files.file);
            }

            if(newBook.image_type == "file" && req.files.file) {

                newBook.image = req.files.file.name;
            }

            Book.updateOneBook(book_id, newBook, function (err, book) {
                if(book) {
                    newBook._id = book_id;
                    res.json({ok: 1, book: newBook});
                } else {
                    res.json({ok: 0});
                }
            })
        }
    );

    /**
     * @api {delete} /book/delete/:book_id  Insert a new book
     * @apiName Insert Book
     * @apiGroup Book
     * @apiSuccessExample {json} Success-Response:
     * {
     *      ok: 1
     * }
     * @apiErrorExample {json} Error-Response:
     * {
     *      ok: 0
     * }
     *
     */
    router.delete("/book/delete/:book_id", function (req, res) {
        Book.findOneAndRemove({ _id: req.params.book_id }, function(err, book) {
            if(book) {
                res.json({ok: 1});
            } else {
                res.json({ok: 0});
            }
        });
    });

    app.get("/help", function (req, res) {
        res.sendFile(path.join(__dirname + "/../../../api-doc/index.html"));
    });

    app.use("/api", router);
};