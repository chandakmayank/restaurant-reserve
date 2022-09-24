const { authJwt } = require("../middleware");
const controller = require("../controllers/reservation.controller");
const Validator = require('../middleware/validators')

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // api/checkSlot
  // api/reserveTable
  // api/getAllReservations
  // api/getCalendar
  // api/cancelReservation



  app.get(
    "/api/getAllReservations",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllReservations
  );

  app.get(
    "/api/getCalendar",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.getCalendar
  );

   app.get(
    "/api/everyReservation",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.everyReservation
  );

  app.post('/api/reserveTable', Validator('reserveTable'), controller.reserveTable );
  app.delete('/api/cancelReservation',
   Validator('reservationRemove'),
   controller.cancelReservation );

  app.post('/api/checkSlot', Validator('slotChecker'), controller.checkSlots)
  };


//   app.post(
//     "/api/removeTable",
//     // [authJwt.verifyToken, authJwt.isAdmin],
//     controller.removeTable
//   );
// };
