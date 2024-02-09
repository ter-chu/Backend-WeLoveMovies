const db = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  // TODO: Write your code here
  return db("reviews as r")
    .where({review_id: reviewId})
    .del()
}

async function list(movie_id) {
  // TODO: Write your code here
  return db("reviews as r")
  .join("movies as m", "r.movie_id", "m.movie_id")
  .where({"r.movie_id": movie_id})
  .select("r.*")
  .groupBy("r.movie_id")
}

async function read(reviewId) {
  // TODO: Write your code here
  return db("reviews as r")
    .select("*")
    .where({review_id: reviewId})
    .first()
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
