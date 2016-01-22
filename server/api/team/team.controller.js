'use strict';

var _ = require('lodash');

// Create team
module.exports.createTeam = function(req, res, next) {

    if (req.body.id) {
        delete req.body.id;
    }

    db.models.Team.create(_.merge(req.body, {
        project_id: req.params.projectId
    }))
        .then(function() {
            res.status(201).send('No Content');
        })
        .catch(next);
};

// Get all teams
module.exports.getTeams = function (req, res, next) {

    db.models.Team.findAll()
        .then(function(teams) {
            res.status(200).json(teams);
        })
        .catch(next);
};

// Get team by Id
module.exports.getById = function(req, res, next) {

    db.models.Team.findById(req.params.id)
        .then(function(record) {

            if (!record) {
                return res.status(404).json('Not Found');
            }

            res.status(200).json(record);
        })
        .catch(next);
};

// Update team
module.exports.updateTeam = function(req, res, next) {

    if (req.body.id) {
        delete req.body.id;
    }

    db.models.Team.update(req.body, {
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

    db.models.Team.destroy({
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

// Get team members
module.exports.getMembers = function (req, res, next) {

    db.query('SELECT DISTINCT users.* FROM users, teammembers WHERE teammembers.member_id = users.id AND teammembers.team_id = :teamId', {
            replacements: {
                teamId: req.params.id
            },
            type: Sequelize.QueryTypes.SELECT
        })
        .then(function(users){
            res.status(200).json(users);
        });
};

// Get Project team members by project Id
module.exports.getProjectTeam = function(req, res, next) {

    db.models.Team.findOne({
        where: {
            'project_id': req.params.projectId
        }
    })
        .then(function(record) {

            if (!record) {
                return res.status(404).json('Not Found');
            }

            db.models.TeamMember.findAll({
                where: {
                    'team_id': record.id
                }
            })
                .then(function(records) {
                    res.status(200).json(records);
                })
                .catch(next);
        })
        .catch(next);
};

// Get Project team by project Id
module.exports.getTeamByProjectId = function(req, res, next) {

    db.models.Team.findOne({
            where: {
                'project_id': req.params.projectId
            }
        })
        .then(function(record) {

            if (!record) {
                return res.status(404).json('Not Found');
            }

            res.status(200).json(record);
        })
        .catch(next);
};