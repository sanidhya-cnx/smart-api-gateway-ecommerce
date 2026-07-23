const User = require("../models/user.model");

const getAllUsers = async (page, limit, filters) => {
    const skip = (page - 1) * limit;
    const users = await User.find(filters)
        .skip(skip)
        .limit(limit);
    const totalUsers = await User.countDocuments(filters);
    return {
        users,
        totalUsers
    };
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const updateUser = async (id, userData) => {
    return await User.findByIdAndUpdate(
        id,
        userData,
        {
            returnDocument: "after",
            runValidators: true
        }
    );
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};