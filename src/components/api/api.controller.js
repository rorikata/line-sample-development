const express = require('express');
const service = require('./api.service');

const router = express.Router();

router.post('/callback', service.test);
router.post('/rich', service.rich);
router.get('/setDefaultRichMenu', service.setDefaultRichMenu);
router.post('/richmenuImage', service.uploadRichmenuImage);

module.exports = router;
