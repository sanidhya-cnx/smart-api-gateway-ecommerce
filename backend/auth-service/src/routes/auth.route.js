const express = require("express");

const {
    login, register, refresh, logout
} = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { loginSchema } = require("../../validators/auth.validator");

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", register)
router.post("/refresh", refresh);
router.post("/logout", logout);
module.exports = router;