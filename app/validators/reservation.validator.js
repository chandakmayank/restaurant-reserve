// Reservation validator

const Joi = require('joi');

const reservationSchema = Joi.object({
    reservation_id: Joi.number().greater(0).required(),
    table_no: Joi.number().greater(0).required(),
    party_size: Joi.number().required(),
    reservation_date: Joi.date().required(),
    start_time: Joi.date().timestamp().required(),
    end_time: Joi.date().timestamp().required(),
    username: Joi.string().required()
});

module.exports = reservationSchema;