const Sse = require("json-sse");
const { Router } = require("express");
const GameRoom = require("./../gameRoom/model");

const stream = new Sse();

const router = new Router();

// get on the stream
router.get("/", async (request, response, next) => {
  try {
    const allRooms = await GameRoom.findAll();
    const action = {
      type: "gameroom/ALL_ROOMS",
      payload: allRooms
    };
    const json = JSON.stringify(action);
    stream.updateInit(json);
    stream.init(request, response);
  } catch (error) {
    next(error);
  }
});

module.exports = { streamRouter: router, stream };
