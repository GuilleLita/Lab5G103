import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IBuildingController from "./IControllers/IBuildingController";
import IBuildingService from '../services/IServices/IBuildingService';
import {IBuildingDTO} from '../dto/IBuildingDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class BuildingController implements IBuildingController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.building.name) private buildingServiceInstance : IBuildingService
  ) {}


  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingServiceInstance.CreateBuilding(req.body as IBuildingDTO) as Result<{buildingDTO: IBuildingDTO}>;
        
      if (buildingOrError.isFailure) {
        return res.status(402).send();
      }

      const buildingDTO = buildingOrError.getValue();
      return res.json( buildingDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const BuldingOrError = await this.buildingServiceInstance.updateBuilding(req.body as IBuildingDTO) as Result<{buildingDTO: IBuildingDTO}>;

      if (BuldingOrError.isFailure) {
        return res.status(404).send();
      }

      const buldingDTO = BuldingOrError.getValue();
      return res.status(201).json( buldingDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAllBuildings(req: Request, res: Response, next: NextFunction) {
    try {
      const buldingOrError = await this.buildingServiceInstance.getAllBuildings() as Result<{buildingDTO: IBuildingDTO[]}>;

      if (buldingOrError.isFailure) {
        return res.status(404).send();
      }

      const buldingDTO = buldingOrError.getValue();
      return res.status(201).json( buldingDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}