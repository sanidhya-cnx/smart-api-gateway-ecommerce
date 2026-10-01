const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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

module.exports = {
    login,
    register
};