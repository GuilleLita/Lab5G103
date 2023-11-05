import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITypeRobotController from "./IControllers/ITypeRobotController";
import ITypeRobotService from '../services/IServices/ITypeRobotService';
import ITypeRobotDTO from '../dto/ITypeRobotDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class TypeRobotController implements ITypeRobotController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.typerobot.robotType) private typerobotServiceInstance : ITypeRobotService
  ) {}

  public async createTypeRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const typerobotOrError = await this.typerobotServiceInstance.createTypeRobot(req.body as ITypeRobotDTO) as Result<ITypeRobotDTO>;
        
      if (typerobotOrError.isFailure) {
        return res.status(402).send();
      }

      const typerobotDTO = typerobotOrError.getValue();
      return res.json( typerobotDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateTypeRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const typerobotOrError = await this.typerobotServiceInstance.updateTypeRobot(req.body as ITypeRobotDTO) as Result<ITypeRobotDTO>;

      if (typerobotOrError.isFailure) {
        return res.status(404).send();
      }

      const typerobotDTO = typerobotOrError.getValue();
      return res.status(201).json( typerobotDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}