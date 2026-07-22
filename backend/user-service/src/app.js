const express = require('express');
const indexRouter = require('./routes/index.routes');
const userRouter = require('./routes/user.routes');
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
app.use('/',indexRouter)
app.use('/users', userRouter);
app.use(errorMiddleware);


module.exports = app;