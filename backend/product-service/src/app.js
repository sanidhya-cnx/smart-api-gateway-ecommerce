const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const productRoutes = require("./routes/product.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

app.use((err, req, res, next) => {
  const statusCode =
    err.name === "ValidationError" ||
      err.name === "CastError"
      ? 400
      : 500;

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Internal server error"
        : err.message
  });
});

module.exports = app;