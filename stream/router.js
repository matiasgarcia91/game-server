const Sse = require("json-sse");
const { Router } = require("express");

const stream = new Sse();

const router = new Router();

const iAmLive = stream => {
  setInterval(() => {
    stream.send("I'm alive!");
  }, 2000);
};

// get on the stream
router.get("/stream", async (request, response, next) => {
  try {
    const json = JSON.stringify("Hi welcome to my stream");
    stream.updateInit(json);
    stream.init(request, response);
    iAmLive(stream);
  } catch (error) {
    next(error);
  }
});

module.exports = { streamRouter: router, stream };
