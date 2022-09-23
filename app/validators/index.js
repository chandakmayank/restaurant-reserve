//* validators/index.js
const register = require('./register.validator')
const {tables,removeTable} = require('./tables.validator')
const {reservation,reservationRemove,reserveTable, slotChecker} = require('./reservation.validator')


module.exports = {
    register, tables, removeTable, reservation,reservationRemove, reserveTable, slotChecker
}
