const express = require("express");

const authRoutes = require("./routes/auth.route");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;