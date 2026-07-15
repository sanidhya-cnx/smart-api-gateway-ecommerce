const express = require('express');

const loggerMiddleware = require('./middlewares/logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const requestIDMiddleware = require('./middlewares/requestID.middleware');
const dynamicProxy = require('./proxy/dynamic.proxy');
const indexRouter = require('./routes');


const app = express();

app.use(express.json());
app.use(requestIDMiddleware);
app.use(loggerMiddleware);
app.use(dynamicProxy);
app.use('/', indexRouter);
app.use(errorMiddleware);


module.exports = app;