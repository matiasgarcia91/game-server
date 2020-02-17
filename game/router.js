const { Router } = require("express");
const Room = require("./../room/model");
const Game = require("./model");

function factory(stream) {
  const router = new Router();

  router.post("/game/ready", async (req, res, next) => {
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
            ]
          }
        });
        stream.send(startingGame);
      }
    } catch (e) {
      next(e);
    }
  });

  router.post("/join", async (req, res, next) => {
    const {
      user,
      body: { roomId }
    } = req;
    const updatedUser = await user.update({ roomId: roomId });
    res.json(updatedUser);
  });

  return router;
}

module.exports = factory;
