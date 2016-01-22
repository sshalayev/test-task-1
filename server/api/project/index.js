'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./project.controller');

router.post('/:userId', controller.createProject);
router.get('/', controller.getProjects);
router.get('/:id', controller.getById);
router.get('/tag/:tagName', controller.getByTag);
router.put('/:id', controller.updateProject);
router.delete('/:id', controller.deleteById);

module.exports = router;