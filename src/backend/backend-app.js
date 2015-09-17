module.exports = {
    startServer: function (staticConfig) {

        var express = require('express');
        var bodyParser = require('body-parser');
        var multer = require('multer');

        var app = express();

        app.set('api_doc', __dirname + "/../../api-doc");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use("/image", express.static(__dirname + "../../../uploads"));
        app.use(express.static(__dirname + "/public"));
        app.use(express.static(__dirname + "/../common/public"));
        app.use(express.static(__dirname + "/../../api-doc"));

        require("./server/controller.js")(app, staticConfig, multer);

        var port = staticConfig["http-backend-port"];

        app.listen(port, function () {
            console.log("Server backend running in port: " + port);
        });
    }
};