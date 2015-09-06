module.exports = {
    startServer: function (staticConfig) {

        var express = require('express');
        var bodyParser = require('body-parser');

        var app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(express.static(__dirname + "/public"));
        app.use(express.static(__dirname + "/../common/public"));

        require("./server/controller.js")(app, staticConfig);

        var port = staticConfig["http-backend-port"];

        app.listen(port, function () {
            console.log("Server backend running in port: " + port);
        });
    }
};