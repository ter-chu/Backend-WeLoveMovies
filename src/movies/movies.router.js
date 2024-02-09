const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router.route("/:movieId([0-9]+)")
    .get(controller.read)
    .all(methodNotAllowed);

router
    .route("/:movieId([0-9]+)/theaters")
    .get(controller.listTheater)
    .all(methodNotAllowed);

router
    .route("/:movieId([0-9]+)/reviews")
    .get(controller.listReviews)
    .all(methodNotAllowed);

module.exports = router;
