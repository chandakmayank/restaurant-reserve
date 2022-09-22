const { authJwt } = require("../middleware");
const controller = require("../controllers/tables.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/getTables",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.getTable
  );


  app.post(
    "/api/addTable",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.addTable
  );


  app.post(
    "/api/removeTable",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.removeTable
  );
};
