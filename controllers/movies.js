const Movie = require('../models/movie');

const { IncorrectDateError } = require('../errors/incorrect-date');
const { NotFoundError } = require('../errors/not-found');
const { NotPermissionError } = require('../errors/not-permission');

module.exports.getAllSavedMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    owner,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDateError('Переданы некорректные данные при создании карточки'));
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner === req.user._id) {
        return movie.remove()
          .then(() => res.send({ message: 'карточка успешно удалена' }));
      }
      throw new NotPermissionError('Эта карточка с фильмом не ваша');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDateError(`id ${req.params.movieId} указан некорректно`));
      }
      next(err);
    });
};
