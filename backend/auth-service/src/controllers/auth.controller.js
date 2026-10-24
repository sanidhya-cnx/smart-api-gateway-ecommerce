const authService = require("../services/auth.service");
const asyncHandler = require("../../../api-gateway/src/utils/asyncHandler");
const {
  revokeRefreshToken
} = require("../services/refreshToken.service");

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

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  await revokeRefreshToken(refreshToken);
  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });

});

module.exports = {
    login,
    register,
    refresh,
    logout
};