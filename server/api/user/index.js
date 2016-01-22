'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

router.post('/', controller.createUser);
router.get('/', controller.getUsers);
router.get('/:id', controller.getById);
router.get('/tag/:tagName', controller.getByTag);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteById);


module.exports = router;