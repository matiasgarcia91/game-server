const db = require("../db");
const Sequelize = require("sequelize");

const User = db.define(
  "user",
  {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
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
