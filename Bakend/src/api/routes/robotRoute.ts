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
      body: Joi.object({
        //buildingId: Joi.string().required(),
        robotType: Joi.string().required(),
        currentlytask: Joi.string().required(),
        currentlyPosition: Joi.array().required(),
        destinationPosition: Joi.array().required(),
        status: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;

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
//you can`t update the task if the robot is inhibit
//you have to update everytime to move
  route.put('/updatetask',
    celebrate({
      body: Joi.object({
        
        currentlytask: Joi.string().required(),
        currentlyPosition: Joi.array().required(),
        destinationPosition: Joi.array().required(),
        status: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateRobot(req, res, next) );

    route.patch('/inhibit',
    celebrate({
      body: Joi.object({
        status: Joi.string().required(),
      }),
    }),
    (req, res, next) => {
      if (req.body.status) {
        req.body.status = 'inhibit';
      }
    ctrl.inhibitRobot(req, res, next);
    }
  );

  route.patch('/desinhibit',
    celebrate({
      body: Joi.object({
        status: Joi.string().required(),
      }),
    }),
    (req, res, next) => {
      if (req.body.status) {
        req.body.status = 'working';
      }
    ctrl.desinhibitRobot(req, res, next);
    }
  );
  
  

    route.get('/getall', function(req, res, next) {
      ctrl.getAllRobots(req, res, next);
    });

    route.get('/getbytask',
    celebrate({
      body: Joi.object({
        task: Joi.number().required(),
      }),
    }), (req, res, next) => ctrl.getRobotsByTask(req, res, next) );


};
