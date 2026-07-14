const express = require('express');

const loggerMiddleware = require('./middlewares/logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const requestIDMiddleware = require('./middlewares/requestID.middleware');
const userProxy = require("./proxy/user.proxy");
const indexRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(requestIDMiddleware);
app.use(loggerMiddleware);
app.use("/users", userProxy);
app.use('/', indexRouter);
app.use(errorMiddleware);

module.exports = app;