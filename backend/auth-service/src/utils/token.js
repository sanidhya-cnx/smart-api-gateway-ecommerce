const jwt = require("jsonwebtoken")
const crypto = require("crypto");

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_ACCESS_EXPIRES_IN
        }
    )
}

const generateRefreshToken = () => {

    return crypto.randomBytes(64).toString("hex");

};

const hashRefreshToken = (token) => {

    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    hashRefreshToken
}