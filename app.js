require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParse = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralizedErrorHandler = require('./middlewares/centralized-error-handler');
const cors = require('./middlewares/cors');

const routerList = require('./routes/index');
const { MONGOOSE_URL } = require('./constants');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors);
app.use(helmet());

// логгер запросов, выше всех запросов и выше мидлваров, на которых запрос может быть отклонен
app.use(requestLogger);

app.use(limiter);

// в старых версиях надо устанавливать npm пакет body-parser
app.use(express.json());
app.use(express.json({ extended: true }));
app.use(cookieParse());

// mongoose.connect(NODE_ENV === 'production' ? MONGOOSE_URL : 'mongodb://localhost:27017/bitfilmsdb');
mongoose.connect(MONGOOSE_URL);

// все роуты в одном файле
app.use(routerList);

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());
// централизованный обработчик ошибок
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
