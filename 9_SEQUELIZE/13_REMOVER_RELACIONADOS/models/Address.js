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

/* Relacionamento entre User e Address:
- Um usuário pode ter muitos endereços (hasMany).
- Um endereço pertence a um usuário (belongsTo).
- A chave estrangeira "userId" é usada para associar os endereços a um usuário específico.
- O parâmetro foreignKey é usado para definir o nome da chave estrangeira na tabela Address que referencia a tabela User.
*/
User.hasMany(Address, { foreignKey: "userId" });
Address.belongsTo(User, { foreignKey: "userId" });

module.exports = Address;
