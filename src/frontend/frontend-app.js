module.exports = {
    startServer: function (staticConfig) {

        var express = require('express');
        var app = express();
        var multer = require('multer');
        var bodyParser = require('body-parser');
        var passport = require('passport');


        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(express.static(__dirname + "/public"));
        app.use(express.static(__dirname + "/../common/public"));

        require("./server/controller.js")(app, staticConfig, passport);

        var port = staticConfig["http-frontend-port"];

        app.listen(port, function () {
            console.log("Server frontend running in port: " + port);
        });

    }
};