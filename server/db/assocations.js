const db = require("./db");
const Puppy = require("./Puppy");

Puppy.belongsTo(Puppy, { as: "friend" });

module.exports = {
  db,
  Puppy
};
