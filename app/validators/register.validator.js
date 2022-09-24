//* validators/register.validator.js
const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    username: Joi.number().greater(1000).less(9999).required(),
    password: Joi.string().min(6).required(),
    roles: Joi.array().items(Joi.string())
});

module.exports = registerSchema;
