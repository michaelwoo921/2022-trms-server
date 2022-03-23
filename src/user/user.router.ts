import express from 'express';
import logger from '../log';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  logger.trace('GET /users called');
  res.send('respond with a resource');
});

export default router;
