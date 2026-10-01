const express = require('express');
require('dotenv').config();
const cors = require('cors');
const rateLimiter = require("./middlewares/rateLimiter.middleware");
const loggerMiddleware = require('./middlewares/logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const requestIDMiddleware = require('./middlewares/requestID.middleware');
const dynamicProxy = require('./proxy/dynamic.proxy');
const indexRouter = require('./routes');
const authenticate = require('./middlewares/auth.middleware');


const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-request-id", "x-api-key"]
}));

app.use(express.json());
app.use(rateLimiter);
app.use(requestIDMiddleware);
app.use(loggerMiddleware);

app.use('/', indexRouter);
app.use(authenticate)
app.use(dynamicProxy);
app.use(errorMiddleware);


module.exports = app;