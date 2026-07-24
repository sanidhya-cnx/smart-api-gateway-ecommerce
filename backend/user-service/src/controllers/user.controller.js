const userService = require("../services/user.service");
const asyncHandler = require("../utils/asyncHandler");
const NotFoundError = require("../errors/NotFoundError");
const ApiResponse = require("../utils/apiResponse");

const getAllUsers = asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const filters = {};
    if(req.query.search){
        filters.$or = [
            {name: {$regex: req.query.search, $options: "i"}},
            {email: {$regex: req.query.search, $options: "i"}}
        ]
    }

    const allowedSortFields = [
        "name",
        "email",
        "createdAt"
    ];
    let sort ="-createdAt";
    if(req.query.sort){
        const field = req.query.sort.replace("-", "");
        if(allowedSortFields.includes(field)){
            sort = req.query.sort;
        }
        
    }

    const { users, totalUsers } = await userService.getAllUsers(page, limit, filters, sort);
    res.status(200).json(
        new ApiResponse(
            true,
            "Users fetched successfully",
            users,
            {
                page,
                limit,
                totalUsers,
                totalPages: Math.ceil(totalUsers / limit)
            }
        )
    );
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    res.status(200).json(
        new ApiResponse(
            true,
            "User fetched successfully",
            user
        )
    );
});

const createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(
        new ApiResponse(
            true,
            "User created Successfully",
            user
        )
    );
});

const updateUser = asyncHandler(async (req, res) => {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(
            new ApiResponse(
                true,
                "User Updated Successfully",
                user
            )
        );
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    res.status(200).json(
        new ApiResponse(
            true,
            "User Deleted Successfully",
            user
        )
    );
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
