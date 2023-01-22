const router = require('express').Router();

const {
  getOwnInfo,
  updateOwnInfo,
} = require('../controllers/users');

router.get('/me', getOwnInfo);
router.patch('/me', updateOwnInfo);

module.exports = router;
