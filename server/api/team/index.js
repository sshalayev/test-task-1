'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./team.controller');

router.post('/:projectId', controller.createTeam);
router.get('/project/:projectId', controller.getTeamByProjectId);
router.get('/project/:projectId/members', controller.getProjectTeam);
router.get('/', controller.getTeams);
router.get('/:id', controller.getById);
router.get('/:id/members', controller.getMembers);
router.put('/:id', controller.updateTeam);
router.delete('/:id', controller.deleteById);

module.exports = router;