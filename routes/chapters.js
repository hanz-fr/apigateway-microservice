const express = require('express');
const router = express.Router();

const chaptersHandler = require('./handler/chapters');

// Create Route
router.post('/', chaptersHandler.create);

// Update Route
router.put('/:id', chaptersHandler.update);

// Delete Route
router.delete('/:id', chaptersHandler.destroy);

// Get Route
router.get('/:id', chaptersHandler.get);

// GetAll Route
router.get('/', chaptersHandler.getAll);


module.exports = router;
