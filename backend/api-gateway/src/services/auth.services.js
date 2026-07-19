const jwt = require("jsonwebtoken");

const login = async ({ email, password }) => {

    // Mock Authentication
    if (
        email !== "admin@gmail.com" ||
        password !== "123456"
    ) {
        throw new Error("Invalid Email or Password");
    }

    // Mock User
    const user = {
        id: 1,
        name: "Sanidhya",
        email: "admin@gmail.com",
        role: "Admin"
    };

    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return {
        success: true,
        message: "Login Successful",
        token
    };
};

module.exports = {
    login
};