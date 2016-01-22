'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./tag.controller');

router.post('/:userId/:projectId', controller.createTag);
router.get('/:userId', controller.getTagsForUser);
router.get('/:userId/:projectId', controller.getTagsForUserProject);
router.put('/:id', controller.updateTag);
router.delete('/:id', controller.deleteById);

module.exports = router;