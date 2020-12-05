const line = require('@line/bot-sdk');
const Boom = require('@hapi/boom');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

async function test(req, res, next) {
  // webhook callback
  if (req.body.destination) {
    console.log(`Destination User ID: ${req.body.destination}`);
  }

  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return next(Boom.badRequest('req.body.events should be an array of events'));
  }

  // handle events separately
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
}

async function rich(req, res, next) {
  const richmenu = {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: false,
    name: 'Rei',
    chatBarText: 'メニュー',
    areas: [
      {
        bounds: {
          x: 50,
          y: 50,
          width: 1400,
          height: 450,
        },
        action: {
          type: 'message',
          label: 'button',
          text: '左上',
        },
      },
      {
        bounds: {
          x: 50,
          y: 550,
          width: 1400,
          height: 450,
        },
        action: {
          type: 'message',
          label: 'button',
          text: '左中央',
        },
      },
      {
        bounds: {
          x: 50,
          y: 1050,
          width: 1400,
          height: 450,
        },
        action: {
          type: 'message',
          label: 'button',
          text: '左下',
        },
      },
      {
        bounds: {
          x: 50,
          y: 1550,
          width: 1400,
          height: 100,
        },
        action: {
          type: 'message',
          label: 'button',
          text: '左最下',
        },
      },
      {
        bounds: {
          x: 1525,
          y: 50,
          width: 900,
          height: 500,
        },
        action: {
          type: 'message',
          label: 'button',
          text: '右上',
        },
      },
      {
        bounds: {
          x: 1525,
          y: 600,
          width: 900,
          height: 500,
        },
        action: {
          type: 'message',
          label: 'button',
          text: '右中央',
        },
      },
      {
        bounds: {
          x: 1525,
          y: 1150,
          width: 900,
          height: 500,
        },
        action: {
          type: 'message',
          label: 'button',
          text: '右下',
        },
      },
    ],
  };
  client.createRichMenu(richmenu)
    .then((richMenuId) => {
      console.log(richMenuId);
      res.json(richMenuId);
    })
    .catch((err) => {
      next(Boom.badRequest('Error at create rich menu', err));
    });
}

async function setDefaultRichMenu(req, res, next) {
  const { richMenuId } = req.body;
  await client.setDefaultRichMenu(richMenuId);
  res.json();
}

async function uploadRichmenuImage(req, res, next) {
  const { richMenuId } = req.body;
  const image = path.join(__dirname, '../../../public/images/', 'richmenu.jpg');
  try {
    await client.setRichMenuImage(richMenuId, fs.createReadStream(image));
    res.json();
  } catch (err) {
    next(Boom.badImplementation('Something wrong.', err));
  }
}

module.exports = {
  test,
  rich,
  setDefaultRichMenu,
  uploadRichmenuImage,
};
