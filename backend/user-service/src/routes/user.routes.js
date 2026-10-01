const express = require("express");

const validate = require("../middlewares/validate.middleware");
const {
    createUserSchema,
    updateUserSchema
} = require("../validators/user.validator");
const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../../../api-gateway/src/middlewares/authorize.middleware");
const internalOnly = require("../middlewares/internalAuth.middleware");
const {healthCheck} = require("../controllers/index.controller");
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    getProfile
} = require("../controllers/user.controller");

router.get("/health", healthCheck);
router.get("/", authenticate, authorize("admin"), getAllUsers);
router.get(
    "/profile",
    authenticate,
    getProfile
);
router.post("/internal/find-by-email",internalOnly, getUserByEmail);
router.post("/internal/create",internalOnly,createUser);
router.get("/:id", getUserById);
router.post("/", validate(createUserSchema), createUser);
router.put('/:id',authenticate, authorize("admin","user"),validate(updateUserSchema), updateUser);
router.delete('/:id',authenticate, authorize("admin"),deleteUser);



module.exports = router;