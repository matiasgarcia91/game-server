const express = require("express");
const cors = require("cors");

const authMiddleware = require("./auth/middleware");

const userRouter = require("./user/router");
const authRouter = require("./auth/router");
const gameRoomRouter = require("./gameRoom/router");
const { streamRouter, stream } = require("./stream/router");

const app = express();
const port = 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);
app.use(express.json());

app.use(userRouter);
app.use(authRouter);
app.use("/stream", streamRouter);
app.use("/gameRoom", authMiddleware, gameRoomRouter(stream));

app.listen(port, () => console.log(`Listening on :${port}`));
