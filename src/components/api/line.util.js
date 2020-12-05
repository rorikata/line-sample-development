const handler = {};

handler.sticker = (message => ({
  type: 'sticker',
  packageId: message.packageId,
  stickerId: message.stickerId,
}));

handler.location = (message => ({
  type: 'location',
  title: message.title,
  address: message.address,
  latitude: message.latitude,
  longitude: message.longitude,
}));

handler.carousel = (message => ({
  type: 'template',
  altText: 'Carousel alt text',
  template: {
    type: 'carousel',
    columns: [
      {
        thumbnailImageUrl: buttonsImageURL,
        title: 'hoge',
        text: 'fuga',
        actions: [
          { label: 'Go to line.me', type: 'uri', uri: 'https://line.me' },
          { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
        ],
      },
      {
        thumbnailImageUrl: buttonsImageURL,
        title: 'hoge',
        text: 'fuga',
        actions: [
          {
            label: '言 hello2', type: 'postback', data: 'hello こんにちは', text: 'hello こんにちは',
          },
          { label: 'Say message', type: 'message', text: 'Rice=米' },
        ],
      },
    ],
  },
}));

handler.carousel = (message => ({
  type: 'template',
  altText: 'Image carousel alt text',
  template: {
    type: 'image_carousel',
    columns: [
      {
        imageUrl: 'https://www.theislandhotel.eu/wp-content/uploads/sites/4/MG_9313-1.jpg',
        action: { label: '予約する。', type: 'uri', uri: 'https://line.me' },
      },
      {
        imageUrl: 'https://www.theislandhotel.eu/wp-content/uploads/sites/4/MG_8458-b.jpg',
        action: { label: '予約する。', type: 'postback', data: 'hello こんにちは' },
      },
      {
        imageUrl: 'https://www.theislandhotel.eu/wp-content/uploads/sites/4/MG_9221_ph-1.jpg',
        action: { label: '予約する。', type: 'message', text: 'Rice=米' },
      },
    ],
  },
}));
