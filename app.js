const express = require('express');
const mongoose = require('mongoose');
const cookieParse = require('cookie-parser');
// const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const centralizedErrorHandler = require('./middlewares/centralized-error-handler');

const { createUser, login, logOut } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.json({ extended: true }));
app.use(cookieParse());

// mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
mongoose.connect('mongodb://localhost:27017/bitfilmsdb')
  .then(() => console.log('Mongoose connected!'))
  .catch((err) => console.log(`Mongoose connection error ${err}`));

// логгер запросов
app.use(requestLogger);

// авторизация не требуется
// app.post('/signup', createUserValidation, createUser);
app.post('/signup', createUser);
// app.post('/signin', loginValidation, login);
app.post('/signin', login);

// нужна авторизация
app.use(auth);
// app.post('/logout', logOut);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));
// app.use('*', require('./routes/not-found-request'));
app.post('/signout', logOut);

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
// app.use(errors());
// централизованный обработчик ошибок
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
