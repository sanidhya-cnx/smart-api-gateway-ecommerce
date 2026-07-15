const express = require("express");
const { healthCheck } = require("../controllers/index.controller");
const router = express.Router();

router.get("/users/health", healthCheck);

module.exports = router;