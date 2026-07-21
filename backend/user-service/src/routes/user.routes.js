const express = require("express");

const validate = require("../middlewares/validate.middleware");
const {
    createUserSchema
} = require("../validators/user.validator");

const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", validate(createUserSchema), createUser);
router.put('/:id',validate(createUserSchema), updateUser);
router.delete('/:id', deleteUser);

module.exports = router;