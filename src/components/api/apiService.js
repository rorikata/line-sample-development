const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'Lbe26SFZwSbi9w2li0+H3hH0RRtWvBnOXlmCqftsw8uwTzOLMrN+GQi/vVlHdLmJ1qr3vhkXZZ+GyD29kqRWCElPk+s0k8bA1xqzh+mF25dvPTDl177mZ4qUDPSg2T64Oqo2cFB4urHm7Dz1j+3zTwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '1dd6452da22685b6fcc8949157600b51',
};

const client = new line.Client(config);

async function test(req, res, next) {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
  res.json();
}

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

module.exports = {
  test,
};
