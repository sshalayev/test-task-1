'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./teammember.controller');

router.post('/:teamId/:userId', controller.createMember);
router.get('/id/:id', controller.getById);
router.delete('/:id', controller.deleteById);

module.exports = router;