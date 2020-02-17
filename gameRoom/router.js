const { Router } = require("express");
const GameRoom = require("./model");

function factory(stream) {
  const router = new Router();

  router.post("/", async (req, res, next) => {
    try {
      const { name } = req.body;
      const newRoom = await GameRoom.create({ name });
      console.log(newRoom);
      const action = {
        type: "gameroom/ONE_ROOM",
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
    const updatedUser = await user.update({ gameRoomId: roomId });
    res.json(updatedUser);
  });

  return router;
}

module.exports = factory;
