import express from 'express';
import logger from '../log';
import trmsService from './trms.service';
import { Trms } from './trms';

const router = express.Router();

router.get('/', function (req, res, next) {
  trmsService.getAllTrms().then((data) => {
    logger.info(data);
    return res.status(200).json(data);
  });
});

router.post('/:name/:createdDate', function (req, res, next) {
  logger.debug(req.body);
  const { name, createdDate } = req.params;
  let t: Trms = { name, createdDate, ...req.body };
  logger.debug(t);
  trmsService
    .addTrms(t)
    .then((data) => {
      if (data) {
        res.sendStatus(201);
      } else {
        res.status(400).send('item already exists');
      }
    })
    .catch((err) => {
      logger.error(err);
      res.sendStatus(500);
    });
});
router.put('/:name/:createdDate', function (req, res, next) {
  const { name, createdDate } = req.params;

  let t: Trms = { name, createdDate, ...req.body };
  trmsService
    .updateTrms(t)
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      logger.error(err);
      res.sendStatus(500);
    });
});

router.get('/:name/:createdDate', function (req, res, next) {
  logger.info(req.params);
  const { name, createdDate } = req.params;
  trmsService.getTrms(name, createdDate).then((data) => {
    logger.info(data);
    res.status(200).json(data);
  });
});

router.delete('/:name/:createdDate', function (req, res, next) {
  logger.info(req.params);
  const { name, createdDate } = req.params;
  trmsService.deleteTrms(name, createdDate).then((data) => {
    logger.info(data);
    res.status(200).json(data);
  });
});

export default router;
