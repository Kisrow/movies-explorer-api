const express = require('express');
const mongoose = require('mongoose');
const cookieParse = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const centralizedErrorHandler = require('./middlewares/centralized-error-handler');
const cors = require('./middlewares/cors');
const {
  createMovieValidation,
  loginValidation,
} = require('./middlewares/validate');

const { createUser, login, logOut } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors);
app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(express.json({ extended: true }));
app.use(cookieParse());

// mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

// логгер запросов
app.use(requestLogger);

// авторизация не требуется
app.post('/signup', createMovieValidation, createUser);
app.post('/signin', loginValidation, login);

// нужна авторизация
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.post('/signout', logOut);

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());
// централизованный обработчик ошибок
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
