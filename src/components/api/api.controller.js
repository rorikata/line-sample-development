const express = require('express');
const service = require('./api.service');

const router = express.Router();

router.post('/callback', service.test);

module.exports = router;
