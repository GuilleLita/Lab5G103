import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IFloorController from "./IControllers/IFloorController";
import IFloorService from '../services/IServices/IFloorService';
import {IFloorDTO} from '../dto/IFloorDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class FloorController implements IFloorController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.floor.name) private floorServiceInstance : IFloorService
  ) {}


  public async createFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = await this.floorServiceInstance.CreateFloor(req.body as IFloorDTO) as Result<{floorDTO: IFloorDTO}>;
        
      if (floorOrError.isFailure) {
        return res.status(402).send();
      }

      const FloorDTO = floorOrError.getValue();
      return res.json( FloorDTO ).status(201);
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