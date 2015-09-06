var mongoose = require('mongoose');
var express = require("express");
var Book = require('../../common/models/Books.js');

var router = express.Router();

module.exports = function (app, staticConfig, passport) {
    mongoose.connect('mongodb://localhost/library');

    router.get("/books", function (req, res) {
        Book.listBook({}, function (err, books) {
            res.json(books);
        })
    });

    app.use("/api", router);
};