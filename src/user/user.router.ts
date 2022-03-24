import express from 'express';
import logger from '../log';
import * as user from './user';
import session from 'express-session';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req: any, res, next) {
  let u = { ...req.session.user };
  logger.debug(u);
  if (u.name && u.password) {
    user.login(u.name, u.password).then((user) => {
      if (user === null) {
        return res.sendStatus(401);
      }
      req.session.user = user;
      res.status(200).json(user);
    });
  } else {
    res.sendStatus(401);
  }
});

router.post('/', function (req: any, res, next) {
  const { name, password } = req.body;
  logger.debug(req.body);
  user.login(name, password).then((user) => {
    if (user === null) {
      return res.sendStatus(401);
    }
    req.session.user = user;
    res.redirect('/api/users');
  });
});

router.delete('/', function (req: any, res) {
  req.session.destroy((err: any) => {
    logger.error(err);
    res.sendStatus(204);
  });
});

router.put('/', function (req: any, res) {
  let u: user.User = { ...req.session.user, ...req.body };
  logger.debug(u);
  logger.debug(req.body);
  if (u.name && u.password && u.fund) {
    return user.updateUser(u).then(() => res.redirect('/api/users'));
  }
  return res.sendStatus(401);
});

export default router;
