import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/elevatorService';
import { IElevatorDTO } from '../../dto/IElevatorDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import config from "../../../config";

import IElevatorController from '../../controllers/IControllers/IElevatorController';
var elevator_controller = require('../../controllers/elevatorController');

const route = Router();

export default (app: Router) => {
    app.use('/elevator', route);
    const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        //elevatorId: Joi.string().required(),
        buildingId: Joi.string().required(),
        floorId: Joi.string().required(),
        position: Joi.array().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;

      try {
        const authServiceInstance = Container.get(AuthService);
        const elevatorOrError = await authServiceInstance.CreateElevator(req.body as IElevatorDTO);

        if (elevatorOrError.isFailure) {
          logger.debug(elevatorOrError.errorValue())
          return res.status(401).send(elevatorOrError.errorValue());
        }
    
        const elevatorDTO = elevatorOrError.getValue();

        return res.status(201).json({message: "success", elevatorDTO });
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
        elevatorId: Joi.string().required(),
        buildingId: Joi.string().required(),
        floorId: Joi.string().required(),
        position: Joi.array().required()
      }),
    }),
    (req, res, next) => ctrl.updateElevator(req, res, next) );


    route.get("/getbybuilding",celebrate({
      body: Joi.object({
        buildingcode: Joi.string().required(),
      }),
    }), (req, res, next) => ctrl.getElevatorsByBuilding(req, res, next) );

};
