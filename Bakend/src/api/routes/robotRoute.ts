import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/robotService';
import { IRobotDTO } from '../../dto/IRobotDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');


import IRobotController from '../../controllers/IControllers/IRobotController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/robot', route);
    const ctrl = Container.get(config.controllers.robot.name) as IRobotController;
  route.post(
    '/create',
    celebrate({

        /*buildingId: string;
	buildingName: string;
	description: string;
	height: number;
	width: number;
	numOfFloors: number;
	floors: string[];
	elevatorFloors : string[];*/
      body: Joi.object({
        //buildingId: Joi.string().required(),
        robotType: Joi.string().required(),
        mark: Joi.string().required(),
        model: Joi.string().required(),
        taskspermited: Joi.array().required(),
        currentlytask: Joi.string().required(),
        destinationPosition: Joi.array().required(),
        status: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const authServiceInstance = Container.get(AuthService);
        const robotOrError = await authServiceInstance.CreateRobot(req.body as IRobotDTO);

        if (robotOrError.isFailure) {
          logger.debug(robotOrError.errorValue())
          return res.status(401).send(robotOrError.errorValue());
        }
    
        const robotDTO = robotOrError.getValue();

        return res.status(201).json({message: "success", robotDTO });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.put('/update',
    celebrate({
      body: Joi.object({
        robotType: Joi.string().required(),
        mark: Joi.string().required(),
        model: Joi.string().required(),
        taskspermited: Joi.array().required(),
        currentlytask: Joi.string().required(),
        destinationPosition: Joi.array().required(),
        status: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateRobot(req, res, next) );

    route.get('/getall', function(req, res, next) {
      ctrl.getAllRobots(req, res, next);
    });

};
