import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/buildingService';
import { IBuildingDTO } from '../../dto/IBuildingDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');


import IBuildingController from '../../controllers/IControllers/IBuildingController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/building', route);
    const ctrl = Container.get(config.controllers.building.name) as IBuildingController;
  
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
        buildingCode: Joi.string().required(),
        buildingName: Joi.string().required(),
        description: Joi.string().required(),
        height: Joi.number().required(),
        width: Joi.number().required(),
        numOfFloors: Joi.number().required(),
        floors: Joi.array().required(),
        elevatorFloors: Joi.array().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const authServiceInstance = Container.get(AuthService);
        const buildingOrError = await authServiceInstance.CreateBuilding(req.body as IBuildingDTO);

        if (buildingOrError.isFailure) {
          logger.debug(buildingOrError.errorValue())
          return res.status(401).send(buildingOrError.errorValue());
        }
    
        const buildingDTO = buildingOrError.getValue();

        return res.status(201).json({message: "success", buildingDTO });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.put('/update',
    celebrate({
      body: Joi.object({
        buildingCode: Joi.string().required(),
        buildingName: Joi.string().required(),
        description: Joi.string().required(),
        height: Joi.number().required(),
        width: Joi.number().required(),
        numOfFloors: Joi.number().required(),
        floors: Joi.array().required(),
        elevatorFloors: Joi.array().required(),
      }),
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next) );

    route.get('/getall', function(req, res, next) {
      ctrl.getAllBuildings(req, res, next);
    });

    route.get('/getbyminmax',
    celebrate({
      body: Joi.object({
        min: Joi.number().required(),
        max: Joi.number().required(),
      }),
    }), (req, res, next) => ctrl.getBuildingsByMinMax(req, res, next) );


};
