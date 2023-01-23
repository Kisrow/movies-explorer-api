const router = require('express').Router();

const {
  getAllSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidation,
  defineMovieIdValidation,
} = require('../middlewares/validate');

router.get('/', getAllSavedMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:movieId', defineMovieIdValidation, deleteMovie);

module.exports = router;
