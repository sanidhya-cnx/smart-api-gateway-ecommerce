const authService = require("../services/auth.service");
const asyncHandler = require("../../../api-gateway/src/utils/asyncHandler");

const {

    rotateRefreshToken

} = require("../services/refresh.service");
const userClient = require("../utils/userClient");

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

const refresh = asyncHandler(async (req, res) => {

    const { refreshToken } = req.body;

    const tokens = await rotateRefreshToken(

        refreshToken,

        userClient

    );

    res.status(200).json({

        success: true,

        message: "Tokens refreshed successfully",

        data: tokens

    });

});

module.exports = {
    login,
    register,
    refresh
};