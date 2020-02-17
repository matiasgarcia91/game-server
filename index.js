const express = require("express");
const cors = require("cors");

const authMiddleware = require("./auth/middleware");

const userRouter = require("./user/router");
const authRouter = require("./auth/router");
const roomRouter = require("./room/router");
const { streamRouter, stream } = require("./stream/router");

const app = express();
const port = process.env.PORT || 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);
app.use(express.json());

app.use(userRouter);
app.use(authRouter);
app.use("/stream", streamRouter);
app.use("/room", authMiddleware, roomRouter(stream));

app.listen(port, () => console.log(`Listening on :${port}`));
