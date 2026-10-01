const jwt = require("jsonwebtoken");


const authenticate = (req, res, next) => {

    if(req.path.includes("/internal/")){
        return res.status(403).json({
            success: false,
            message: "Access to internal endpoints is forbidden"
        });
    }

    if(req.method === "POST" && (req.path === "/users" || req.path === "/users/")){
        return next();
    }
    
    if(req.path.startsWith("/auth")){
        return next();
    }

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        req.headers["x-user-id"] = decoded.id;
        req.headers["x-user-email"] = decoded.email;
        req.headers["x-user-role"] = decoded.role;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

};

module.exports = authenticate;