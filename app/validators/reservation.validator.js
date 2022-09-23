// Reservation validator

const Joi = require('joi');

const reservationSchema = Joi.object({
    table_no: Joi.number().greater(0).required(),
    party_size: Joi.number().required(),
    reservation_date: Joi.date().required(),
    start_time: Joi.date().timestamp().required(),
    end_time: Joi.date().timestamp().required(),
    username: Joi.string().required()
});

const slotChecker = Joi.object({
    party_size: Joi.number().greater(0).required(),
    reservation_date: Joi.date().required(),
    start_time: Joi.date().timestamp().required(),
    end_time: Joi.date().timestamp().required()
})

const reservationRemove = Joi.object({
    reservation_id: Joi.string().guid().required(),
})

const reserveTable = Joi.object({
    party_size: Joi.number().greater(0).required(),
    reservation_date: Joi.date().greater('now').required(),
    start_time: Joi.number().min(1200).max(2358).required(),
    duration: Joi.number().min(10).max(720).required()
})

// module.exports = reservationSchema, slotChecker, reservationRemove, reserveTable;

module.exports = {
    reservationRemove: reservationRemove,
    reserveTable: reserveTable
};