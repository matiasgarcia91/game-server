const db = require("../db");
const Sequelize = require("sequelize");

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

module.exports = User;
