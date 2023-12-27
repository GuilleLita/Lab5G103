import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/taskService';
import { ITaskDTO } from '../../dto/ITaskDTO';

import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import config from "../../../config";

import ITaskController from '../../controllers/IControllers/ITaskController';
var task_controller = require('../../controllers/taskController');

const route = Router();

export default (app: Router) => {
    app.use('/task', route);
    const ctrl = Container.get(config.controllers.task.name) as ITaskController;
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        //elevatorId: Joi.string().required(),
        taskName: Joi.string().required(),
        buildingsCode: Joi.array().required(),
        floorsId: Joi.array().required(),
        initialPoint: Joi.array().required(),
        destinationPoint: Joi.array().required(),
        status: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;

      try {
        const authServiceInstance = Container.get(AuthService);
        const taskOrError = await authServiceInstance.CreateTask(req.body as ITaskDTO);

        if (taskOrError.isFailure) {
          logger.debug(taskOrError.errorValue())
          return res.status(401).send(taskOrError.errorValue());
        }
    
        const taskDTO = taskOrError.getValue();

        return res.status(201).json({message: "success", taskDTO });
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
        taskId: Joi.string().required(),
        taskName: Joi.string().required(),
        buildingsCode: Joi.array().required(),
        floorsId: Joi.array().required(),
        initialPoint: Joi.array().required(),
        destinationPoint: Joi.array().required(),
        status: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateTask(req, res, next) );

    route.patch(
      '/updatetaskstatus',
      celebrate({
        body: Joi.object({
          taskId: Joi.string().required(),
          status: Joi.string().required(),
        }),
      }),
      (req, res, next) => ctrl.updateTaskStatus(req, res, next) );

      route.get('/getall', function(req, res, next) {
        ctrl.getTaskId(req, res, next);
      });
      
    route.get("/getbystatus", (req, res, next) => ctrl.getTasksByStatus(req, res, next) );
};
