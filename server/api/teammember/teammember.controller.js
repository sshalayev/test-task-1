'use strict';

var _ = require('lodash');

// Create team member
module.exports.createMember = function(req, res, next) {

    if (req.body.id) {
        delete req.body.id;
    }

    db.models.TeamMember.create(_.merge(req.body, {
            team_id: req.params.teamId,
            member_id: req.params.userId
        }))
        .then(function() {
            res.status(201).send('No Content');
        })
        .catch(next);
};

// Get team member by Id
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

// Delete Team member by Id
module.exports.deleteById = function(req, res, next) {

    db.models.TeamMember.destroy({
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