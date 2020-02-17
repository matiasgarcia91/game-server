const db = require("../db");
const Sequelize = require("sequelize");

const GameRoom = db.define(
  "gameRoom",
  {
    name: Sequelize.STRING
  },
  {
    timestamps: false
  }
);

module.exports = GameRoom;
