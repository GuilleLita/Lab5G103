import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/floorService';
import { IFloorDTO } from '../../dto/IFloorDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');

var floor_controller = require('../../controllers/floorController');

const route = Router();

export default (app: Router) => {
    app.use('/floor', route);

  route.post(
    '/create',
    /*celebrate({

        /*floorId: string;
	floorName: string;
	description: string;
	height: number;
	width: number;
	numOfFloors: number;
	floors: string[];
	elevatorFloors : string[];
      body: Joi.object({
        floorId: Joi.string().required(),
        floorName: Joi.string().required(),
        description: Joi.string().required(),
        height: Joi.number().required(),
        width: Joi.number().required(),
        numOfFloors: Joi.number().required(),
        floors: Joi.array().required(),
        elevatorFloors: Joi.array().required(),
      }),
    }),*/
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

};
