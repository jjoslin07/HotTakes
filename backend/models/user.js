/* Data model for user
● userId: String — the MongoDB unique identifier for the user who created the sauce
● email: String — the user's email address [unique]
● password: String — hash of the user's password
*/

const mongoose = require('mongoose');
// Use mongoose plugin to require unique email in the signup process.
const uniqueValidator = require('mongoose-unique-validator');

// Fucntion to require email validation before signup
let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
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