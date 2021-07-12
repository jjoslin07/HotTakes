/* Data Model For Sauce
● _id: String — the unique identifier created by MongoDB
● userId: String — the MongoDB unique identifier for the user who created the sauce
● name: String — name of the sauce
● manufacturer: String — manufacturer of the sauce
● description: String — description of the sauce
● mainPepper: String — the main pepper ingredient in the sauce
● imageUrl: String — the URL for the picture of the sauce uploaded by the user
● heat: Number — number between 1 and 10 describing the sauce
● likes: Number — number of users liking the sauce
● dislikes: Number — number of users disliking the sauce
● usersLiked: [String] — array of user IDs of users having liked the sauce
● usersDisliked: [String] — array of user IDs of users having disliked the sauce
*/

const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainPepper: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    heat: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    dislikes: {
        type: Number,
        default: 0,
        required: true
    },
    usersLiked: [{
        type: String,
        required: true
    }],
    usersDisliked: [{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('Sauce', sauceSchema);