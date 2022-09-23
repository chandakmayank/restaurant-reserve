//* validators/register.validator.js
const Joi = require('joi');

const tableSchema = Joi.object({
    table_no: Joi.number().greater(0).required(),
    capacity: Joi.number().greater(0).less(13).required(),
});

const removeTable = Joi.object({
    table_no: Joi.number().greater(0).required(),
})
module.exports = tableSchema;

module.exports = {
    tableSchema: tableSchema,
    removeTable: removeTable
};