const express = require('express');

const router = express.Router();
const { healthCheck } = require('../controller/index.controller');

router.get('/', healthCheck);

router.post('/login', (req, res) => {
    console.log(req.body);
    res.json({
        message:'Login request recived',
        data: req.body
    })
});

module.exports = router;
