const express = require("express");
const { healthCheck } = require("../controllers/index.controller");
const router = express.Router();

router.get("/health", healthCheck);
router.get("/", healthCheck);

module.exports = router;