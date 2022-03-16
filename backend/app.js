const express = require('express');
// Import mongoose
const mongoose = require('mongoose');
// Import user routes
const userRoutes = require('./routes/user');
// Import sauce routes
const sauceRoutes = require('./routes/sauce');
// Import 'path' dependency
const path = require('path');

const app = express();
// Require dotenv so .env file can be used to hide mongoDB credentials.
require('dotenv').config();

// Connect to MongoDB database using mongoose connect. (Credentials are saved in .env file for security)
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.q7k29.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

// Use CORS to allow the front end and back end to communicate because they have different origins.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Extract the body portion of incoming request to req.body
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


// Tell Express where to store the images when we receive a request to the /images endpoint.
app.use('/images', express.static(path.join(__dirname, 'images')));
// Use routes for the user.
app.use('/api/auth', userRoutes);
// Use routes for the sauces.
app.use('/api/sauces', sauceRoutes);

// Exports the app.
module.exports = app;