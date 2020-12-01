const apiRoute = require('./api');

function init(app) {
  app.use('/api', apiRoute);

  app.get('*', (req, res) => {
    res.redirect('/');
  });
}

module.exports = init;
