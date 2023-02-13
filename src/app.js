const express = require("express");
const app = express();
app.use(express.json());

const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");

//MIDDLEWARE PARA ROTA NAO ENCONTRADA
const undefinedRoute = (req, res) =>{
    res.status(404).json({
        status: 'failure',
        message: "This route is not defined"
    })
};

//ROUTES
const baseRout = "/api/v1";
app.use(`${baseRout}/users`, userRouter);
app.use(`${baseRout}/events`, eventRouter);
app.use('*', undefinedRoute);

module.exports = app;
 