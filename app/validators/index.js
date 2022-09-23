//* validators/index.js
const register = require('./register.validator')
const tables = require('./tables.validator')
const {reservation,reservationRemove,reserveTable, slotChecker} = require('./reservation.validator')


module.exports = {
    register, tables, reservation,reservationRemove, reserveTable, slotChecker
}
