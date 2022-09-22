const db = require("../models");
const config = require("../config/auth.config");
const Tables= db.tables;

const Op = db.Sequelize.Op;


exports.getTable = (req, res) => {
    Tables.findAll().then( tables =>{
      res.status(200).send({
          tables
        });
    }
      ).catch(err => {
      res.status(500).send({ message: err.message });
    });
};



exports.addTable = (req, res) => {
  // req.body.table_no
  // req.body.capacity
  Tables.create({
    table_no:   req.body.table_no,
    capacity: req.body.capacity
  }).then(
  res.status(200).send("succeesss")
  ).catch(err => {
      res.status(500).send({ message: err.message });
    });

  // res.status(200).send("add a table.");
};


exports.removeTable = (req, res) => {
  res.status(200).send("removeTable.");
};









// exports.signin = (req, res) => {
//   User.findOne({
//     where: {
//       username: req.body.username
//     }
//   })
//     .then(user => {
//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );

//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!"
//         });
//       }

//       var token = jwt.sign({ id: user.id }, config.secret, {
//         expiresIn: 86400 // 24 hours
//       });

//       var authorities = [];
//       user.getRoles().then(roles => {
//         for (let i = 0; i < roles.length; i++) {
//           authorities.push("ROLE_" + roles[i].name.toUpperCase());
//         }
//         res.status(200).send({
//           id: user.id,
//           username: user.username,
//           email: user.email,
//           roles: authorities,
//           accessToken: token
//         });
//       });
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };
