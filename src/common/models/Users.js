var _ = require('lodash');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type : String, default : ''},
    display_name: {type : String, default : ''},
    password: {type : String, default : ''},
    role  : {type : String, default : ''}
});

var userSchemaStaticFuncs = {
    authorize: function (user, callback) {
        this.model('User').findOne(user, callback);
    }
};

_.assign(userSchema.statics, userSchemaStaticFuncs);


module.exports = mongoose.model('User', userSchema);