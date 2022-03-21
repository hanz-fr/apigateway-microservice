const express = require('express');
const router = express.Router();

const coursesHandler = require('./handler/courses');

const verifyToken = require('../middlewares/verifyToken');
const can = require('../middlewares/permission');


// Create Routes
router.post('/', verifyToken, can('admin'), coursesHandler.create);

// Update Routes
router.put('/:id', verifyToken, can('admin'), coursesHandler.update);

// Delete Routes
router.delete('/:id', verifyToken, can('admin'), coursesHandler.destroy);

// GetAll Routes
router.get('/', coursesHandler.getAll);

// Get Routes
router.get('/:id', coursesHandler.get);

module.exports = router;
