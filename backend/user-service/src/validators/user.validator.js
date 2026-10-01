const Joi = require("joi");

const createUserSchema = Joi.object({

    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.base": "Name must be a string",
            "string.empty": "Name is required",
            "string.min": "Name must be at least 2 characters",
            "any.required": "Name is required"
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Invalid email format",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        }),
    password: Joi.string()
        .min(6)
        .max(50)
        .required(),
    role: Joi.string()
        .valid("admin", "user", "seller")
        .default("user")
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(50)
}).min(1);

module.exports = {
    createUserSchema,
    updateUserSchema
};