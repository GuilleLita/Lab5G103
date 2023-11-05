import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRobotController from "./IControllers/IRobotController";
import IRobotService from '../services/IServices/IRobotService';
import {IRobotDTO} from '../dto/IRobotDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RobotController implements IRobotController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.robot.name) private robotServiceInstance : IRobotService
  ) {}


  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.CreateRobot(req.body as IRobotDTO) as Result<{robotDTO: IRobotDTO}>;
        
      if (robotOrError.isFailure) {
        return res.status(402).send();
      }

      const robotDTO = robotOrError.getValue();
      return res.json( robotDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const RobotOrError = await this.robotServiceInstance.updateRobot(req.body as IRobotDTO) as Result<{robotDTO: IRobotDTO}>;

      if (RobotOrError.isFailure) {
        return res.status(404).send();
      }

      const robotDTO = RobotOrError.getValue();
      return res.status(201).json( robotDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async inhibitRobot(req: Request, res: Response, next: NextFunction) {
    try {
    
      if (req.body.status) {
        req.body.status = 'inhibit';
      }
  
      const RobotOrError = await this.robotServiceInstance.updateRobot(req.body as IRobotDTO) as Result<{robotDTO: IRobotDTO}>;
  
      if (RobotOrError.isFailure) {
        return res.status(404).send();
      }
  
      const robotDTO = RobotOrError.getValue();
      return res.status(201).json(robotDTO);
    } catch (e) {
      return next(e);
    }
  };
  

  public async getAllRobots(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.getAllRobots() as Result<{robotDTO: IRobotDTO[]}>;

      if (robotOrError.isFailure) {
        return res.status(404).send();
      }

      const robotDTO = robotOrError.getValue();
      return res.status(200).json( robotDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRobotsByTask(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.getRobotsByTask(req.body.task) as Result<{robotDTO: IRobotDTO[]}>;

      if (robotOrError.isFailure) {
        return res.status(401).send(robotOrError.errorValue());
      }

      const robotDTO = robotOrError.getValue();
      return res.status(200).json( robotDTO );
    }
    catch (e) {
      return next(e);
    }
  }

}