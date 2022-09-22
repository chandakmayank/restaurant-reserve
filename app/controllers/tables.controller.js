
exports.getTable = (req, res) => {
  res.status(200).send("get list of tables.");
};



exports.addTable = (req, res) => {
  res.status(200).send("add a table.");
};


exports.removeTable = (req, res) => {
  res.status(200).send("removeTable.");
};
