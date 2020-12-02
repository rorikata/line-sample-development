const express = require('express');
const controller = require('./api.controller');

const router = express.Router();

router.use('/', controller);

module.exports = router;
