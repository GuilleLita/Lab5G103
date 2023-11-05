import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITypeRobotController from '../../controllers/IControllers/ITypeRobotController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/typerobots', route);

  const ctrl = Container.get(config.controllers.typerobot.robotType) as ITypeRobotController;

  route.post('',
    celebrate({
      body: Joi.object({
        robotType: Joi.string().required(),
        mark: Joi.string().required(),
        model: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createTypeRobot(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        robotType: Joi.string().required(),
        mark: Joi.string().required(),
        model: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateTypeRobot(req, res, next) );
};