const express = require('express');
const { registerMiddleware, errorHandler } = require('./middleware');
const { registerRoutes } = require('./components');

const app = express();

// set up middleware
registerMiddleware(app, express);
// Set up routes
registerRoutes(app);
// set up error handler
errorHandler(app);

module.exports = app;
