import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/hallwayService';
import { IHallwayDTO } from '../../dto/IHallwayDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');

var hallway_controller = require('../../controllers/hallwayController');

const route = Router();

export default (app: Router) => {
    app.use('/hallway', route);

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
        hallwayId: Joi.string().required(),
        buildingsId: Joi.array().required(),
        floorId: Joi.string().required()     
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const authServiceInstance = Container.get(AuthService);
        const userOrError = await authServiceInstance.CreateHallway(req.body as IHallwayDTO);

        if (userOrError.isFailure) {
          logger.debug(userOrError.errorValue())
          return res.status(401).send(userOrError.errorValue());
        }
    
        const hallwaygDTO = userOrError.getValue();

        return res.status(201).json({message: "success", hallwaygDTO });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

};
