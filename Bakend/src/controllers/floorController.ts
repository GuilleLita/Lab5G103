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

  public async updateFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = await this.floorServiceInstance.updateFloor(req.body as IFloorDTO) as Result<{floorDTO: IFloorDTO}>;

      if (floorOrError.isFailure) {
        return res.status(404).send();
      }

      const floorDTO = floorOrError.getValue();
      return res.status(201).json( floorDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getFloorsByBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = await this.floorServiceInstance.getFloorsByBuilding(req.body.buildingCode) as Result<{floorDTO: IFloorDTO[]}>;

      if (floorOrError.isFailure) {
        return res.status(404).send();
      }

      const floorDTO = floorOrError.getValue();
      return res.status(201).json( floorDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async getFloorsWithHallwaysByBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = await this.floorServiceInstance.getFloorsWithHallwaysByBuilding(req.body.buildingCode) as Result<{floorDTO: IFloorDTO[]}>;

      if (floorOrError.isFailure) {
        return res.status(404).send();
      }

      const floorDTO = floorOrError.getValue();
      return res.status(201).json( floorDTO );
    }
    catch (e) {
      return next(e);
    }
  }
  
  public async getFloorsWithElevatorByBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = await this.floorServiceInstance.getFloorsWithElevatorByBuilding(req.body.buildingCode) as Result<{floorDTO: IFloorDTO[]}>;

      if (floorOrError.isFailure) {
        return res.status(402).send(floorOrError.errorValue());
      }

      const floorDTO = floorOrError.getValue();
      return res.status(201).json( floorDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async uploadFloorMap(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = await this.floorServiceInstance.uploadFloorMap(req.body.floorName, req.body.grid) as Result<{floorDTO: IFloorDTO}>;

      if (floorOrError.isFailure) {
        return res.status(402).send(floorOrError.errorValue());
      }

      const floorDTO = floorOrError.getValue();
      return res.status(201).json( floorDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async getFloor(req: Request, res: Response, next: NextFunction) {
    try {
      let floorName = <string>req.query.floorName;
      const floorOrError = await this.floorServiceInstance.getFloor(floorName) as Result<{floorDTO: IFloorDTO}>;

      if (floorOrError.isFailure) {
        return res.status(402).send(floorOrError.errorValue());
      }

      const floorDTO = floorOrError.getValue();
      return res.status(201).json( floorDTO );
    }
    catch (e) {
      return next(e);
    }
  }
}