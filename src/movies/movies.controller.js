const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const {movieId} = request.params; 
  const movieDoesExist = await service.read(movieId); 
  
      if (movieDoesExist) {
        response.locals.movie = movieDoesExist;
        return next();
      }
      next({status: 404, message: `Movie cannot be found`});
   
}
  
async function read(request, response) {
  // TODO: Add your code here
  const {movie_id} = response.locals.movie;
  response.json({ data: await service.read(movie_id)  });
}

async function list(request, response, next) {
  // TODO: Add your code here.
  response.json({data: await service.list(request.query.is_showing)})

}

async function listTheater (req, response, next) {
  const {movieId} = req.params;
  const results = await service.listTheater(movieId);
  response.json({data: results})
}

async function listReviews (req, response, next) {
  const {movieId} = req.params;
  const results = await service.listReviews(movieId);
  response.json({data: results})
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  listReviews: asyncErrorBoundary(listReviews),
  listTheater: asyncErrorBoundary(listTheater),
  read: [asyncErrorBoundary(movieExists), read],
};
