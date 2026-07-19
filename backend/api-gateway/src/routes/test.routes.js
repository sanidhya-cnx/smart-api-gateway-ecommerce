const express = require("express");

const authenticate = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
    "/profile",
    authenticate,
    (req, res) => {

        res.json({
            success: true,
            message: "Protected Route",
            user: req.user
        });

    }
);

module.exports = router;