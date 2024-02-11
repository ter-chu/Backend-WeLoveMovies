const db = require("../db/connection");
const mapProperties = require('../utils/map-properties');

const reduceCritics = mapProperties({
  critic_id: 'critic.critic_id',
  organization_name: 'critic.organization_name',
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  created_at: 'critic.created_at',
  updated_at: 'critic.updated_at',
});

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

function listTheater (movieId) {
  return db ("movies_theaters as mt")
    .join ("theaters as t", "mt.theater_id", "t.theater_id")
    .select("mt.theater_id", "t.name", "t.address_line_1", "t.address_line_2", "t.city", "t.state", "t.zip", "t.created_at", "t.updated_at", "mt.is_showing", "mt.movie_id")
    .where({"mt.movie_id": movieId})
    .andWhere({"mt.is_showing": true})
}

function listReviews (movieId) {
  return db ("reviews as r")
    .join ("critics as c", "r.critic_id", "c.critic_id")
    // .select("mt.theater_id", "t.name", "t.address_line_1", "t.address_line_2", "t.city", "t.state", "t.zip", "t.created_at", "t.updated_at", "mt.is_showing", "mt.movie_id")
    .select("r.*", "c.*")
    .where({"r.movie_id": movieId})
    .then((reviews) => reviews.map((review) => reduceCritics(review)));
}

async function read(movieId) {
  // TODO: Add your code here
  return db('movies').select('*').where({movie_id: movieId}).first();
}

module.exports = {
  list,
  listTheater,
  listReviews,
  read,
};
