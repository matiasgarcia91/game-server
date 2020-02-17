const db = require("../db");
const Sequelize = require("sequelize");
const Room = require("./../room/model");

const Game = db.define(
  "game",
  {
    round: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    player1: {
      type: Sequelize.INTEGER
    },
    player2: {
      type: Sequelize.INTEGER
    },
    score1: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    score2: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    started: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: false
  }
);

Game.belongsTo(Room);
module.exports = Game;
