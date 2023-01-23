const router = require('express').Router();

const {
  getOwnInfo,
  updateOwnInfo,
} = require('../controllers/users');

const {
  updateUserInfoValidation,
} = require('../middlewares/validate');

router.get('/me', getOwnInfo);
router.patch('/me', updateUserInfoValidation, updateOwnInfo);

module.exports = router;
