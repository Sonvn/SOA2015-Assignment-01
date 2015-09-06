var Book = require('../../common/models/Books.js');

module.exports = function (router) {
    router.get("/books", function (req, res) {
        Book.listBook({}, function (err, books) {
            res.json(books);
        })
    });


};
