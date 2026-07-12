const express = require('express');
const app = express();

const loggerMiddleware = require('./middlewares/logger.middleware');
app.use(loggerMiddleware);
const indexRouter = require('./routes');
app.use('/', indexRouter);

module.exports = app;