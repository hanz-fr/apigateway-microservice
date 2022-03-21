const express = require('express');
const router = express.Router();

const webHookHandler = require('./handler/webhook');

router.post('/', webHookHandler.webhook);

module.exports = router;
