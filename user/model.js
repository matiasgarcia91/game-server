const db = require("../db");
const Sequelize = require("sequelize");
const Room = require("./../room/model");

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

User.belongsTo(Room);
Room.hasMany(User);

module.exports = User;
