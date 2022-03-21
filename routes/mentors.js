const express = require('express');
const router = express.Router();

const mentorsHandler = require('./handler/mentors');

// GET ALL ROUTES
router.get('/', mentorsHandler.getAll);

// GET ROUTES
router.get('/:id', mentorsHandler.get);

// CREATE ROUTES
router.post('/', mentorsHandler.create);

// UPDATE ROUTES
router.put('/:id', mentorsHandler.update);

// DELETE ROUTES
router.delete('/:id', mentorsHandler.destroy);

module.exports = router;
