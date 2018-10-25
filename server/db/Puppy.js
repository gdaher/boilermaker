const Sequelize = require("sequelize");
const db = require("./db");
const crypto = require("crypto");

const Puppy = db.define(
  "Puppy",
  {
    name: Sequelize.STRING,
    breed: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
    google_id: Sequelize.STRING
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword
    }
  }
);

// instance methods
Puppy.prototype.correctPassword = function(candidatePassword) {
  // should return true or false for if the entered password matches
  return Puppy.encryptPassword(candidatePassword, this.salt) === this.password;
};

// class methods
Puppy.generateSalt = function() {
  // this should generate our random salt
  return crypto.randomBytes(16).toString("base64");
};

Puppy.encryptPassword = function(plainText, salt) {
  // accepts a plain text password and a salt, and returns its hash
  const hash = crypto.createHash("sha1");
  hash.update(plainText);
  hash.update(salt);
  return hash.digest("hex");
};

function setSaltAndPassword(puppy) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (puppy.changed("password")) {
    puppy.salt = Puppy.generateSalt();
    puppy.password = Puppy.encryptPassword(puppy.password, puppy.salt);
  }
}

module.exports = Puppy;
