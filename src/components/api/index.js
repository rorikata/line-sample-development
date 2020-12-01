const express = require('express');
const apiController = require('./apiController');

const router = express.Router();

router.use('/', apiController);

module.exports = router;
