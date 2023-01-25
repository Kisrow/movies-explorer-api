const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { NotFoundError } = require('../errors/not-found');
const { IncorrectDateError } = require('../errors/incorrect-date');
const { IncorrectEmailError } = require('../errors/incorret-email');

const { NODE_ENV, JWT_SECRET } = process.env;

// возвращает email и имя зарегестрированного пользователя
module.exports.getOwnInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

// обновляет информация пользователя (имя и/или email)
module.exports.updateOwnInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(`Пользователь ${req.user._id} не найден`))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDateError('Переданы некорректные данные при обновлении профиля'));
      }
      if (err.code === 11000) {
        next(new IncorrectEmailError('Данный email уже зарегистрирован'));
      }
      next(err);
    });
};

// создает пользвателя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((matched) => {
      if (matched) {
        next(new IncorrectEmailError('Пользователь уже зарегистрирован'));
      }
      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name,
            email,
            password: hash,
          })
            .then((user) => res.send({
              name,
              email,
              _id: user._id,
            }))
            .catch((err) => {
              if (err.name === 'ValidationError') {
                next(new IncorrectDateError('Переданы некорректные данные при создании пользователя'));
              }
              next(err);
            });
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ email });
    })
    .catch(next);
};

module.exports.logOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'выход из профиля' });
};
