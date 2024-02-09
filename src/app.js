if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const cors = require('cors');

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// TODO: Add your code here
app.use(express.json());
app.use(cors());
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);
//handle when no routes match
app.use ((req, res, next) => {
    // res.send("That route could not be found!");
    next ({status: 404, message: `Path not found ${req.originalUrl}`});
})

//error handler
app.use ((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).json({ error: message });
})
module.exports = app;
