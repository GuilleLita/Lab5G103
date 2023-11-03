import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRoomController from "./IControllers/IRoomController";
import IRoomService from '../services/IServices/IRoomService';
import {IRoomDTO} from '../dto/IRoomDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RoomController implements IRoomController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.Room.name) private roomServiceInstance : IRoomService
  ) {}


  public async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const roomOrError = await this.roomServiceInstance.CreateRoom(req.body as IRoomDTO) as Result<{roomDTO: IRoomDTO}>;
        
      if (roomOrError.isFailure) {
        return res.status(402).send();
      }

      const RoomDTO = roomOrError.getValue();
      return res.json( RoomDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  /*public async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.updateRole(req.body as IRoleDTO) as Result<IRoleDTO>;

      if (roleOrError.isFailure) {
        return res.status(404).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.status(201).json( roleDTO );
    }
    catch (e) {
      return next(e);
    }
  };*/
}