const db = require("../db");
const Sequelize = require("sequelize");
const GameRoom = require("./../gameRoom/model");

const User = db.define(
  "user",
  {
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

User.belongsTo(GameRoom);

module.exports = User;
