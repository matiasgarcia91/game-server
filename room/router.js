const { Router } = require("express");
const Room = require("./model");
const User = require("../user/model");
const Game = require("../game/model");

function factory(stream) {
  const router = new Router();

  router.post("/", async (req, res, next) => {
    try {
      const { name } = req.body;
      const newRoom = await Room.create({ name });

      const action = {
        type: "room/ONE_ROOM",
        payload: newRoom
      };
      const stringAction = JSON.stringify(action);
      stream.send(stringAction);
      res.json(newRoom);
    } catch (e) {
      next(e);
    }
  });

  router.post("/join", async (req, res, next) => {
    const {
      user,
      body: { roomId }
    } = req;
    const room = await Room.findByPk(roomId);
    let locked = room.locked;
    if (!locked) {
      locked = room.players === 1;
      await room.update({ players: room.players + 1, locked });
      const updatedUser = await user.update({ roomId: roomId });
      if (locked) await Game.create({ roomId });

      const updateRoom = JSON.stringify({
        type: "room/UPDATE",
        payload: {
          id: roomId,
          players: room.players,
          locked
        }
      });
      stream.send(updateRoom);

      res.json(updatedUser);
    } else {
      res.status(400).send("Room full");
    }
  });

  return router;
}

module.exports = factory;
