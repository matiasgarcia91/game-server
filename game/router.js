const { Router } = require("express");
const _ = require("lodash");
const Game = require("./model");
const words = require("./words");

function factory(stream) {
  const router = new Router();

  router.post("/ready", async (req, res, next) => {
    try {
      const {
        user,
        body: { roomId }
      } = req;
      const game = await Game.findOne({ roomId });
      if (!game.player1) {
        await game.update({ player1: user.id });
      } else {
        await game.update({ player2: user.id, started: true });
        const p1 = await User.findByPk(game.player1);
        const startingGame = JSON.stringify({
          type: "game/STARTING",
          payload: {
            id: game.id,
            roomId,
            results: [
              { id: p1.id, name: p1.nickname, score: 0 },
              { id: user.id, name: user.nickname, score: 0 }
            ],
            words: _.shuffle(words)
          }
        });
        stream.send(startingGame);
      }
      res.send("Ready to start!");
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = factory;
