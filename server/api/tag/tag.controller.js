'use strict';

var _ = require('lodash');

// Create project
module.exports.createTag = function(req, res, next) {

    if (req.body.id) {
        delete req.body.id;
    }

    db.models.Tag.create(_.merge(req.body, {
            user_id: req.params.userId,
            project_id: req.params.projectId
        }))
        .then(function() {
            res.status(201).send('No Content');
        })
        .catch(next);
};

// Get tags for user (for project)
module.exports.getTagsForUserProject = function (req, res, next) {

    db.models.Tag.findAll({
        where: {
            'user_id': req.params.userId,
            'project_id': req.params.projectId
        }
    })
        .then(function(tags) {
            res.status(200).json(tags);
        })
        .catch(next);
};

// Get tags for user
module.exports.getTagsForUser = function (req, res, next) {

    db.models.Tag.findAll({
            where: {
                user_id: req.params.userId
            }
        })
        .then(function(tags) {
            res.status(200).json(tags);
        })
        .catch(next);
};

// Update tag
module.exports.updateTag = function(req, res, next) {

    if (req.body.id) {
        delete req.body.id;
    }

    db.models.Tag.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(function() {
            res.status(200).send('Ok');
        })
        .catch(next);
};

// Delete Team by Id
module.exports.deleteById = function(req, res, next) {

    db.models.Tag.destroy({
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