import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/floorService';
import { IFloorDTO } from '../../dto/IFloorDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import config from "../../../config";

import IFloorController from '../../controllers/IControllers/IFloorController';
var floor_controller = require('../../controllers/floorController');

const route = Router();

export default (app: Router) => {
    app.use('/floor', route);
    const ctrl = Container.get(config.controllers.floor.name) as IFloorController;
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        floorName: Joi.string().required(),
        description: Joi.string().required(),
        buildingCode: Joi.string().required(),
        height: Joi.number().required(),
        width: Joi.number().required(),
        rooms: Joi.array().required(),
        grid: Joi.array().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const authServiceInstance = Container.get(AuthService);
        const floorOrError = await authServiceInstance.CreateFloor(req.body as IFloorDTO);

        if (floorOrError.isFailure) {
          logger.debug(floorOrError.errorValue())
          return res.status(401).send(floorOrError.errorValue());
        }
    
        const floorDTO = floorOrError.getValue();

        return res.status(201).json({message: "success", floorDTO });
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
        floorName: Joi.string().required(),
        description: Joi.string().required(),
        buildingCode: Joi.string().required(),
        height: Joi.number().required(),
        width: Joi.number().required(),
        rooms: Joi.array().required(),
        grid: Joi.array().required(),
      }),
    }),
    (req, res, next) => ctrl.updateFloor(req, res, next) );


    route.get("/getbybuilding",celebrate({
      body: Joi.object({
        buildingCode: Joi.string().required(),
      }),
    }), (req, res, next) => ctrl.getFloorsByBuilding(req, res, next) );

};
