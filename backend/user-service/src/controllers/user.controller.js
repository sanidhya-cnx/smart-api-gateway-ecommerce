const userService = require("../services/user.service");
const asyncHandler = require("../utils/asyncHandler");
const NotFoundError = require("../errors/NotFoundError");

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json({
        success: true,
        data: users
    });
});

const getUserById = asyncHandler(async (req, res) => {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        res.status(200).json({
            success: true,
            data: user
        });
});

const createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json({
        success: true,
        data: user
    });
});

const updateUser = asyncHandler(async (req, res) => {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: user
        });
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
        throw new NotFoundError("User not found");
    }
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
