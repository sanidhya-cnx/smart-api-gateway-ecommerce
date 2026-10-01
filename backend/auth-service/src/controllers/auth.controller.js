const authService = require("../services/auth.service");

const login = async (req, res, next) => {

    try {

        const result = await authService.login(
            req.body.email,
            req.body.password
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });

    } catch (error) {

        next(error);

    }

};

const register = async (req, res, next) => {
    try {
        const result =
            await authService.register(req.body);
        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    register
};