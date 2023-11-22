import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/roomService';
import { IRoomDTO } from '../../dto/IRoomDTO';

import { celebrate, Joi } from 'celebrate';
import winston = require('winston');

var room_controller = require('../../controllers/roomController');

const route = Router();

export default (app: Router) => {
    app.use('/room', route);

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
        roomId: Joi.string().required(),
        buildingsId: Joi.string().required(),
        floorId: Joi.string().required(),
        position: Joi.array().required(),     
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const authServiceInstance = Container.get(AuthService);
        const roomOrError = await authServiceInstance.CreateRoom(req.body as IRoomDTO);

        if (roomOrError.isFailure) {
          logger.debug(roomOrError.errorValue())
          return res.status(401).send(roomOrError.errorValue());
        }
    
        const roomgDTO = roomOrError.getValue();

        return res.status(201).json({message: "success", roomgDTO });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

};
