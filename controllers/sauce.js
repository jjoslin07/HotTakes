const Sauce = require('../models/sauce');
const fs = require('fs');

// Creates a new sauce using Sauce schema model .
exports.createSauce = (req, res, next) => {
    req.body.sauce = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.sauce.heat,
        likes: req.body.sauce.likes,
        dislikes: req.body.sauce.dislikes,
        usersLiked: req.body.sauce.usersLiked,
        usersDisliked: req.body.sauce.usersDisliked
    });
    // Save the sauce
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Sauce created successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

// Gets uniuqe sauce by id created by MongoDB for description page.
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

// Modify the sauce with a unique id from the database.
exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce({
        _id: req.params._id
    });
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.sauce = JSON.parse(req.body.sauce);
        sauce = {
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            mainPepper: req.body.sauce.mainPepper,
            imageUrl: url + '/images/' + req.file.filename,
            heat: req.body.sauce.heat,
        };
    } else {
        // If new image isn't uploaded use old image.
        sauce = {
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            image: req.body.imageUrl,
            heat: req.body.heat,
        };
    }
    // Update any modifications to sauce and save.
    Sauce.updateOne({
        _id: req.params.id
    }, sauce).then(
        () => {
            res.status(201).json({
                message: 'Sauce updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

// Delete sauce from the database and use `fs.unlink` to remove images from system storage.
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            // Delete image from local storage
            fs.unlink('images/' + filename, () => {
                Sauce.deleteOne({
                    _id: req.params.id
                }).then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
            });
        }
    );
};

// Manage the likes and dislikes for a sauce with a unique id for each user.
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then((sauce) => {
        // Adds 1 like to the sauce for unique user.
        if (req.body.like === 1 && !sauce.usersLiked.includes(req.body.userId)) {
            sauce.usersLiked.push(req.body.userId);
            sauce.likes += 1;
            // Adds 1 dislike to the suace for unique user.
        } else if (req.body.like === -1 && !sauce.usersDisliked.includes(req.body.userId)) {
            sauce.usersDisliked.push(req.body.userId);
            sauce.dislikes += 1;
        } else {
            // Removes 1 like for a unique sauce and user.
            req.body.like = 0;
            if (sauce.usersLiked.includes(req.body.userId)) {
                sauce.usersLiked.remove(req.body.userId);
                sauce.likes += -1;
            }
            // Removes 1 dislike for a unique sauce and user.
            if (sauce.usersDisliked.includes(req.body.userId)) {
                sauce.usersDisliked.remove(req.body.userId);
                sauce.dislikes += -1;
            }
        }
        Sauce.updateOne({
            _id: req.params.id
        }, sauce)
            .then((sauce) => {
                res.status(201).json(sauce);
            })
            .catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
    });
};

// Gathers all sauces that have been saved to the database and display on homepage.
exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};