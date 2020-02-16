const express = require("express");
const cors = require("cors");
//const Sse = require("json-sse");

const authMiddleware = require("./auth/middleware");

const userRouter = require("./user/router");
const authRouter = require("./auth/router");
const { streamRouter } = require("./stream/router");

const app = express();
const port = 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);
app.use(express.json());

app.use(userRouter);
app.use(authRouter);
app.use(streamRouter);

app.get("/test", authMiddleware, (req, res, next) => {
  res.send(`Entraste capo, sos este boludo: ${req.user.first_name}`);
});

app.listen(port, () => console.log(`Listening on :${port}`));

// const stream = new Sse();

// const iAmLive = stream => {
//   setInterval(() => {
//     stream.send("I'm alive!");
//   }, 2000);
// };
// // get on the stream
// app.get("/stream", async (request, response, next) => {
//   try {
//     const json = JSON.stringify("Hi welcome to my stream");

//     stream.updateInit(json);
//     stream.init(request, response);
//     iAmLive(stream);
//   } catch (error) {
//     next(error);
//   }
// });
