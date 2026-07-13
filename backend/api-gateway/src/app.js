const express = require('express');

const loggerMiddleware = require('./middlewares/logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const indexRouter = require('./routes');

const app = express();

app.use(loggerMiddleware);
app.use(express.json());
app.use('/', indexRouter);
app.use(errorMiddleware);

module.exports = app;