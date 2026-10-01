const User = require("../models/user.model");
const BadRequestError = require("../errors/BadRequestError");
const bcrypt = require("bcryptjs");

const getAllUsers = async (page, limit, filters, sort) => {
    const skip = (page - 1) * limit;
    const users = await User.find(filters)
        .sort(sort)
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
    const isUserAlreadyExists = await User.findOne({email: userData.email});
    if(isUserAlreadyExists){
        throw new BadRequestError("User already exists");
    }
    const user = await User.create(userData);

    const createdUser = await User.findById(user._id);

    return createdUser;
};

const updateUser = async (id, userData) => {

    if(userData.password){
        userData.password = await bcrypt.hash(userData.password, 10);
    }
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

const getUserByEmail = async (email) => {
    return await User.findOne({
        email
    }).select("+password");
};


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
};