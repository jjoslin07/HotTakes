const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Sign the user up with a unique id using a unique email and hash's the password to store in database.
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // Save user to database.
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'User added successfully!'
                    });
                }
            ).catch(
                (error) => {
                    return res.status(401).json({
                        error: error,
                        message: 'Email not valid or is already in use, please try again!'
                    });
                }
            );
        }
    );
};

// Searches for user in the database and if found compares password with bcrypt hash and logs user in.
exports.login = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found!')
                });
            }
            // Compare password hash's to login user in.
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrect password!')
                        });
                    }
                    // Use Json Web Token to keep the user signed in (Gives unique token that expires in 24 hours.)
                    const token = jwt.sign({
                        userId: user._id
                    },
                        process.env.SECRET_TOKEN, {
                        expiresIn: '24h'
                    });
                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
};