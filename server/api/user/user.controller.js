'use strict';

// Get all users
module.exports.getUsers = function (req, res, next) {

    db.models.User.findAll()
        .then(function(users) {
            res.status(200).json(users);
        })
        .catch(next);
};

// Create user
module.exports.createUser = function(req, res, next) {

    if (req.body.id) {
        delete req.body.id;
    }

    db.models.User.create(req.body)
        .then(function() {
            res.status(201).send('No Content');
        })
        .catch(next);
};

// Get User by Id
module.exports.getById = function(req, res, next) {

    db.models.User.findById(req.params.id)
        .then(function(record) {

            if (!record) {
                return res.status(404).json('Not Found');
            }

            res.status(200).json(record);
        })
        .catch(next);
};

// Update user
module.exports.updateUser = function(req, res, next) {

    if (req.body.id) {
        delete req.body.id;
    }

    db.models.User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(function() {
            res.status(200).send('Ok');
        })
        .catch(next);
};

// Delete User by Id
module.exports.deleteById = function(req, res, next) {

    db.models.User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function(count) {

            if (!count || count === 0) {
                return res.status(404).json('Not Found');
            }

            res.status(201).json('No Content');
        })
        .catch(next);
};

// Get users list by tag
module.exports.getByTag = function(req, res, next) {

    db.query('SELECT DISTINCT users.* FROM users, tags WHERE tags.user_id = users.id AND tags.name = :tag', {
            replacements: {
                tag: String(req.params.tagName).toLowerCase().trim()
            },
            type: Sequelize.QueryTypes.SELECT
        })
        .then(function(users){
            res.status(200).json(users);
        });
};