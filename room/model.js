const db = require("../db");
const Sequelize = require("sequelize");

const Room = db.define(
  "room",
  {
    name: Sequelize.STRING,
    players: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    locked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = Room;
