const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const User = require("./User");

const Address = db.define("Address", {
  street: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
});

// Relacionamento entre User e Address
User.hasOne(Address, { foreignKey: "userId" });
// Um endereço pertence a um usuário, e a chave estrangeira é "userId" na tabela Address
Address.belongsTo(User, { foreignKey: "userId" });

module.exports = Address;
