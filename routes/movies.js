const router = require('express').Router();

const {
  getAllSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getAllSavedMovies);
router.post('/', createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
