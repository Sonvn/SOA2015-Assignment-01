var _ = require('lodash');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {type : String, default : '', trim : true},
    description: {type : String, default : '', trim : true},
    image: {type : String, default : ''},
    image_type: {type : String, default : ''},
    number: {type : Number, min: 0, default : 10},
    available: {type : Number, min: 0, default : 10},
    created_at  : {type : Date, default : Date.now}
});

var bookSchemaStaticFuncs = {
    updateOneBook: function (book_id, update, callback) {
        this.model('Book').findOneAndUpdate({_id: book_id}, {$set: update}, callback);
    },
    listBook: function (options, callback) {
        var criteria = options.criteria || {};
        if(options.perPage && options.page) {
            this.model('Book').find(criteria).limit(options.perPage).skip(options.perPage * options.page).exec(callback);
        } else {
            this.model('Book').find(criteria).exec(callback);
        }
    }
};

_.assign(bookSchema.statics, bookSchemaStaticFuncs);

module.exports = mongoose.model('Book', bookSchema);