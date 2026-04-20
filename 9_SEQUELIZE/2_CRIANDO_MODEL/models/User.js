const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    //não pode ser nulo
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING,
    // nem vazio nem nulo
    required: true,
  },
  newslatter: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = User;
