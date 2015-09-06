var _ = require('lodash');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type : String, default : ''},
    display_name: {type : String, default : ''},
    password: {type : String, default : ''},
    role  : {type : String, default : ''}
});

//var userSchemaStaticFuncs = {
//    updateOneBook: function (product_id, update, callback) {
//        this.model('User').findOneAndUpdate({_id: product_id}, {$set: update}, callback);
//    },
//    listBook: function (options, callback) {
//        var criteria = options.criteria || {};
//        if(options.perPage && options.page) {
//            this.model('User').find(criteria).limit(options.perPage).skip(options.perPage * options.page).exec(callback);
//        } else {
//            this.model('User').find(criteria).exec(callback);
//        }
//    }
//};
//
//_.assign(userSchema.statics, userSchemaStaticFuncs);


module.exports = mongoose.model('User', userSchema);