
const config = {
  channelAccessToken: 'Lbe26SFZwSbi9w2li0+H3hH0RRtWvBnOXlmCqftsw8uwTzOLMrN+GQi/vVlHdLmJ1qr3vhkXZZ+GyD29kqRWCElPk+s0k8bA1xqzh+mF25dvPTDl177mZ4qUDPSg2T64Oqo2cFB4urHm7Dz1j+3zTwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '1dd6452da22685b6fcc8949157600b51',
};
const baseURL = 'https://pure-citadel-71095.herokuapp.com';
const buttonsImageURL = `${baseURL}/static/buttons/1040.jpg`;

const client = new line.Client(config);

// simple reply function
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map(text => ({ type: 'text', text })),
  );
};

// callback function to handle a single event
function handleEvent(event) {
  if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return console.log(`Test hook recieved: ${JSON.stringify(event.message)}`);
  }

  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return handleText(message, event.replyToken, event.source);
        case 'image':
          return handleImage(message, event.replyToken);
        case 'video':
          return handleVideo(message, event.replyToken);
        case 'audio':
          return handleAudio(message, event.replyToken);
        case 'location':
          return handleLocation(message, event.replyToken);
        case 'sticker':
          return handleSticker(message, event.replyToken);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case 'follow':
      return client.replyMessage(
        event.replyToken,
        {
          type: 'template',
          altText: 'Buttons alt text',
          template: {
            type: 'buttons',
            thumbnailImageUrl: buttonsImageURL,
            title: 'My button sample',
            text: 'Hello, my button',
            actions: [
              { label: 'Go to line.me', type: 'uri', uri: 'https://line.me' },
              { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
              {
                label: '言 hello2', type: 'postback', data: 'hello こんにちは', text: 'hello こんにちは',
              },
              { label: 'Say message', type: 'message', text: 'Rice=米' },
            ],
          },
        },
      );
    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case 'join':
      return replyText(event.replyToken, `Joined ${event.source.type}`);

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'postback':
      let data = event.postback.data;
      if (data === 'DATE' || data === 'TIME' || data === 'DATETIME') {
        data += `(${JSON.stringify(event.postback.params)})`;
      }
      return replyText(event.replyToken, `Got postback: ${data}`);

    case 'beacon':
      return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

function handleText(message, replyToken, source) {
  switch (message.text) {
    case 'buttons':
      return client.replyMessage(
        replyToken,
        {
          type: 'template',
          altText: 'Buttons alt text',
          template: {
            type: 'buttons',
            thumbnailImageUrl: buttonsImageURL,
            title: 'My button sample',
            text: 'Hello, my button',
            actions: [
              { label: 'Go to line.me', type: 'uri', uri: 'https://line.me' },
              { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
              {
                label: '言 hello2', type: 'postback', data: 'hello こんにちは', text: 'hello こんにちは',
              },
              { label: 'Say message', type: 'message', text: 'Rice=米' },
            ],
          },
        },
      );
    case 'carousel':
      return client.replyMessage(
        replyToken,

      );
    case 'image carousel':
      return client.replyMessage(
        replyToken,

      );
    default: // デフォルトメッセージ
      console.log(`Echo message to ${replyToken}: ${message.text}`);
      return replyText(replyToken, message.text);
  }
}
