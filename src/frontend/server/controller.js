var mongoose = require('mongoose');
//var jwt = require('jsonwebtoken');
var express = require("express");

var router = express.Router();

module.exports = function (app, staticConfig, passport) {
    mongoose.connect('mongodb://localhost/library');

    require("./book-controller.js")(router);
    //require("./user-controller.js")(router, passport);
    //
    app.use("/api", router);
};