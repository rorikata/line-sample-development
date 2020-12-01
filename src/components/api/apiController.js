const express = require('express');
const apiService = require('./apiService');

const router = express.Router();

router.post('/callback', apiService.test);

module.exports = router;
