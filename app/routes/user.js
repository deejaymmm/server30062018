var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    Id: Number,
    Username: {type: String, unique: true},
    Password: String,
    Email: String
}, {collection: 'users1'});

module.exports = mongoose.model('User', UserSchema);

/*var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(text) {
                return text.indexOf('@') !== -1;
            },
            message: 'email must have symbol @.'
        }
    }
});

var User = mongoose.model('User', userSchema);
module.exports = User;*/