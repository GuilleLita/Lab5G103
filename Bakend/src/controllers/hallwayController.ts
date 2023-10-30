import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IHallwayController from "./IControllers/IHallwayController";
import IHallwayService from '../services/IServices/IHallwayService';
import {IHallwayDTO} from '../dto/IHallwayDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class HallwayController implements IHallwayController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.hallway.name) private hallwayServiceInstance : IHallwayService
  ) {}


  public async createHallway(req: Request, res: Response, next: NextFunction) {
    try {
      const hallwayOrError = await this.hallwayServiceInstance.CreateHallway(req.body as IHallwayDTO) as Result<{hallwayDTO: IHallwayDTO}>;
        
      if (hallwayOrError.isFailure) {
        return res.status(402).send();
      }

      const hallwayDTO = hallwayOrError.getValue();
      return res.json( hallwayDTO ).status(201);
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