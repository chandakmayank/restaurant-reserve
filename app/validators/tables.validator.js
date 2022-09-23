//* validators/register.validator.js
const Joi = require('joi');

const tableSchema = Joi.object({
    table_no: Joi.number().greater(0).required(),
    capacity: Joi.number().greater(0).less(13).required(),
});

module.exports = tableSchema;
