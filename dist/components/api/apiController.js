const express = require('express');
const line = require('@line/bot-sdk');
const apiService = require('./apiService');

const router = express.Router();

const config = {
  channelAccessToken: 'Lbe26SFZwSbi9w2li0+H3hH0RRtWvBnOXlmCqftsw8uwTzOLMrN+GQi/vVlHdLmJ1qr3vhkXZZ+GyD29kqRWCElPk+s0k8bA1xqzh+mF25dvPTDl177mZ4qUDPSg2T64Oqo2cFB4urHm7Dz1j+3zTwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '1dd6452da22685b6fcc8949157600b51'
};

router.post('/callback', line.middleware(config), apiService.test);

module.exports = router;
//# sourceMappingURL=apiController.js.map