const mongoose = require('mongoose');

const { regExpUrl } = require('../middlewares/validate');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return regExpUrl.test(link);
      },
      message: 'Неправильно указана ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return regExpUrl.test(link);
      },
      message: 'Неправильно указана ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return regExpUrl.test(link);
      },
      message: 'Неправильно указана ссылка',
    },
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
