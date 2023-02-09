const express = require("express");
const app = express();
app.use(express.json());

const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");

//ROUTES
const baseRout = "/api/v1";
app.use(`${baseRout}/users`, userRouter);
app.use(`${baseRout}/events`, eventRouter);

module.exports = app;
