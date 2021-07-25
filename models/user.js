/* Data model for user
● userId: String — the MongoDB unique identifier for the user who created the sauce
● email: String — the user's email address [unique]
● password: String — hash of the user's password
*/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: false,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);