//* validators/index.js
const register = require('./register.validator')
const {tableSchema,removeTable} = require('./tables.validator')
const {reservation,reservationRemove,reserveTable, slotChecker} = require('./reservation.validator')


module.exports = {
    register, tableSchema, removeTable, reservation,reservationRemove, reserveTable, slotChecker
}
