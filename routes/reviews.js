const express = require('express');
const router = express.Router();

const reviewsHandler = require('./handler/reviews');

// Create Routes
router.post('/', reviewsHandler.create);

// Update Routes
router.put('/:id', reviewsHandler.update);

// Destroy Routes
router.delete('/:id', reviewsHandler.destroy);

module.exports = router;
