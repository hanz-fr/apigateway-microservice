const express = require('express');
const router = express.Router();

const lessonsHandler = require('./handler/lessons');

// Create Route
router.post('/', lessonsHandler.create);

// Update Route
router.put('/:id', lessonsHandler.update);

// Destroy Route
router.delete('/:id', lessonsHandler.destroy);

// Get Route
router.get('/:id', lessonsHandler.get);

// GetAll Route
router.get('/', lessonsHandler.getAll);

module.exports = router;
