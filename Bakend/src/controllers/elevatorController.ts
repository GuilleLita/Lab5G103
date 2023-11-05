import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IElevatorController from "./IControllers/IElevatorController";
import IElevatorService from '../services/IServices/IElevatorService';
import {IElevatorDTO} from '../dto/IElevatorDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class ElevatorController implements IElevatorController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.elevator.name) private elevatorServiceInstance : IElevatorService
  ) {}

  public async createElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = await this.elevatorServiceInstance.CreateElevator(req.body as IElevatorDTO) as Result<{elevatorDTO: IElevatorDTO}>;
        
      if (elevatorOrError.isFailure) {
        return res.status(402).send();
      }

      const ElevatorDTO = elevatorOrError.getValue();
      return res.json( ElevatorDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = await this.elevatorServiceInstance.updateElevator(req.body as IElevatorDTO) as Result<{elevatorDTO: IElevatorDTO}>;

      if (elevatorOrError.isFailure) {
        return res.status(404).send();
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.status(201).json( elevatorDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getElevatorsByBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = await this.elevatorServiceInstance.getElevatorsByBuilding(req.body.buildingCode) as Result<{elevatorDTO: IElevatorDTO[]}>;
      if (elevatorOrError.isFailure) {
        return res.status(404).send();
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.status(201).json( elevatorDTO );
    }
    catch (e) {
      return next(e);
    }
  }
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