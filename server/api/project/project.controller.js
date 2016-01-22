'use strict';

var _ = require('lodash');

// Create project
module.exports.createProject = function(req, res, next) {

    if (req.body.id) {
        delete req.body.id;
    }

    db.models.Project.create(_.merge(req.body, {
        creator_id: req.params.userId
    }))
        .then(function() {
            res.status(201).send('No Content');
        })
        .catch(next);
};

// Get all projects
module.exports.getProjects = function (req, res, next) {

    db.models.Project.findAll()
        .then(function(projects) {
            res.status(200).json(projects);
        })
        .catch(next);
};

// Get Project by Id
module.exports.getById = function(req, res, next) {

    db.models.Project.findById(req.params.id)
        .then(function(record) {

            if (!record) {
                return res.status(404).json('Not Found');
            }

            res.status(200).json(record);
        })
        .catch(next);
};

// Update project
module.exports.updateProject = function(req, res, next) {

    if (req.body.id) {
        delete req.body.id;
    }

    db.models.Project.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(function() {
            res.status(200).send('Ok');
        })
        .catch(next);
};

// Delete Project by Id
module.exports.deleteById = function(req, res, next) {

    db.models.Project.destroy({
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

// Get projects list by tag
module.exports.getByTag = function(req, res, next) {

    //db.models.Project.findAll({
    //        include: [
    //            {
    //                model: db.models.Tag,
    //                where: {
    //                    name: req.params.tagName,
    //                    project_id: Sequelize.col('projects.id')
    //                }
    //            }
    //        ]
    //    })
    //    .then(function(projects) {
    //        res.status(200).json(projects);
    //    })
    //    .catch(next);

    db.query('SELECT DISTINCT projects.* FROM projects, tags WHERE tags.project_id = projects.id AND tags.name = :tag', {
            replacements: {
                tag: String(req.params.tagName).toLowerCase().trim()
            },
            type: Sequelize.QueryTypes.SELECT
        })
        .then(function(projects){
            res.status(200).json(projects);
        });
};