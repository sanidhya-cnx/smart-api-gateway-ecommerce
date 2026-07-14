const { v4: uuidv4 } = require('uuid');

function requestIDMiddleware(req, res, next){
    req.requestID = uuidv4();
    next();
}

module.exports = requestIDMiddleware;