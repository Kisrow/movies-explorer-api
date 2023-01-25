const router = require('express').Router();

const auth = require('../middlewares/auth');
const {
  createUserValidation,
  loginValidation,
} = require('../middlewares/validate');

const { NotFoundError } = require('../errors/not-found');
const { createUser, login, logOut } = require('../controllers/users');

// авторизация не требуется
router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

// нужна авторизация
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.post('/signout', logOut);

router.use('*', (req, res, next) => next(new NotFoundError('URL не существует')));

module.exports = router;
