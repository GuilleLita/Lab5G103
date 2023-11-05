import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/hallwayService';
import { IHallwayDTO } from '../../dto/IHallwayDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import config from "../../../config";
import IHallwayController from '../../controllers/IControllers/IHallwayController';

var hallway_controller = require('../../controllers/hallwayController');

const route = Router();

export default (app: Router) => {
    app.use('/hallway', route);
    const ctrl = Container.get(config.controllers.hallway.name) as IHallwayController;

  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        //hallwayId: Joi.string().required(),
        buildingsCode: Joi.array().required(),
        floorsId: Joi.array().required(),
        position: Joi.array().required()     
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      try {
        const authServiceInstance = Container.get(AuthService);
        const hallwayOrError = await authServiceInstance.CreateHallway(req.body as IHallwayDTO);

        if (hallwayOrError.isFailure) {
          logger.debug(hallwayOrError.errorValue())
          return res.status(401).send(hallwayOrError.errorValue());
        }
    
        const hallwaygDTO = hallwayOrError.getValue();

        return res.status(201).json({message: "success", hallwaygDTO });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.put(
    '/update',
    celebrate({
      body: Joi.object({
        hallwayId: Joi.string().required(),
        buildingsCode: Joi.array().required(),
        floorsId: Joi.array().required(),
        position: Joi.array().required()     
      }),
    }),
    (req, res, next) => ctrl.updateHallway(req, res, next) );

    route.get('/getbetweenbuildings',
    celebrate({
      body: Joi.object({
        building1: Joi.string().required(),
        building2: Joi.string().required(),
      }),
    }),
     (req, res, next) => ctrl.getBetweenBuildings(req, res, next) );

};
