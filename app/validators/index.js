//* validators/index.js
const register = require('./register.validator')
const tables = require('./tables.validator')
const reservation = require('./reservation.validator')


module.exports = {
    register, tables, reservation
}
