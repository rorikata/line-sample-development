const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const line = require('@line/bot-sdk');
const apiService = require('../components/api/api.service');

const config = {
  channelAccessToken: 'Lbe26SFZwSbi9w2li0+H3hH0RRtWvBnOXlmCqftsw8uwTzOLMrN+GQi/vVlHdLmJ1qr3vhkXZZ+GyD29kqRWCElPk+s0k8bA1xqzh+mF25dvPTDl177mZ4qUDPSg2T64Oqo2cFB4urHm7Dz1j+3zTwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '1dd6452da22685b6fcc8949157600b51',
};

const client = new line.Client(config);

const { NODE_ENV } = process.env;

const middleware = {};

middleware.registerMiddleware = (app, express) => {
  app.use(logger('dev'));
  app.use('/api/line/webhook', line.middleware(config), apiService.test);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../../public')));
};

middleware.errorHandler = (app) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res) => {
    console.log(err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  });
};


module.exports = middleware;
