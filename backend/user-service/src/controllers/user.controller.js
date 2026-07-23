const userService = require("../services/user.service");
const asyncHandler = require("../utils/asyncHandler");
const NotFoundError = require("../errors/NotFoundError");

const getAllUsers = asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const filters = {};
    if(req.query.name){
        filters.name = req.query.name;
    }
    if(req.query.email){
        filters.email = req.query.email;
    }

    const { users, totalUsers } = await userService.getAllUsers(page, limit);
    res.status(200).json({
        success: true,
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
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
