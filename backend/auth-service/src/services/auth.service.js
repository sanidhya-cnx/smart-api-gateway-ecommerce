const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/token");
const { createRefreshToken } = require("./refreshToken.service");

const userClient = require("../utils/userClient");

const login = async (email, password) => {


    const user = await userClient.getUserByEmail(email);

    if (!user) {
        const error =  new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await createRefreshToken(user._id);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

const register = async (userData) => {
    const existingUser =
        await userClient.getUserByEmail(
            userData.email
        );
    if (existingUser) {
        throw new BadRequestError(
            "Email already registered"
        );
    }
    const user =
        await userClient.createUser(userData);
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
    return {
        token,
        user
    };
};

const refreshAccessToken = async (refreshToken) => {

    let decoded;

    try {

        decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

    } catch (error) {

        throw new UnauthorizedError(
            "Invalid or expired refresh token"
        );

    }

    const user =
        await userClient.getUserById(decoded.id);

    if (!user) {
        throw new UnauthorizedError(
            "User not found"
        );
    }

    const accessToken =
        generateAccessToken(user);

    return {
        accessToken
    };
};

module.exports = {
    login,
    register,
    refreshAccessToken
};