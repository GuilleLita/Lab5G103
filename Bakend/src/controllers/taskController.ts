import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITaskController from "./IControllers/ITaskController";
import ITaskService from '../services/IServices/ITaskService';
import {ITaskDTO} from '../dto/ITaskDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class TaskController implements ITaskController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.task.name) private taskServiceInstance : ITaskService
  ) {}

  public async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskOrError = await this.taskServiceInstance.CreateTask(req.body as ITaskDTO) as Result<{taskDTO: ITaskDTO}>;
        
      if (taskOrError.isFailure) {
        return res.status(402).send();
      }

      const TaskDTO = taskOrError.getValue();
      return res.json( TaskDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskOrError = await this.taskServiceInstance.updateTask(req.body as ITaskDTO) as Result<{taskDTO: ITaskDTO}>;

      if (taskOrError.isFailure) {
        return res.status(402).send(taskOrError.errorValue());
      }

      const taskDTO = taskOrError.getValue();
      return res.status(201).json( taskDTO );
    }
    catch (e) {
      return next(e);
    }
  };
  public async updateTaskStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const taskOrError = await this.taskServiceInstance.updateTask(req.body as ITaskDTO) as Result<{taskDTO: ITaskDTO}>;

      if (taskOrError.isFailure) {
        return res.status(402).send(taskOrError.errorValue());
      }

      const taskDTO = taskOrError.getValue();
      return res.status(201).json( taskDTO );
    }
    catch (e) {
      return next(e);
    }
  };
  
  public async getTaskId(req: Request, res: Response, next: NextFunction) {
    try {
      const taskOrError = await this.taskServiceInstance.getTaskId() as Result<{taskDTO: ITaskDTO[]}>;

      if (taskOrError.isFailure) {
        return res.status(404).send();
      }

      const taskDTO = taskOrError.getValue();
      return res.status(201).json( taskDTO );
    }
    catch (e) {
      return next(e);
    }
  };
  public async getTasksByStatus(req: Request, res: Response, next: NextFunction) {
    try {
      let status = <string>req.query.status;
      const taskOrError = await this.taskServiceInstance.getTasksByStatus(status) as Result<{taskDTO: ITaskDTO[]}>;
      if (taskOrError.isFailure) {
        return res.status(402).send(taskOrError.errorValue());
      }

      const taskDTO = taskOrError.getValue();
      return res.status(201).json( taskDTO );
    }
    catch (e) {
      return next(e);
    }
  }
/*
  public async getElevatorsByBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      let buildingcode = <string>req.query.buildingCode;
      const elevatorOrError = await this.elevatorServiceInstance.getElevatorsByBuilding(buildingcode) as Result<{elevatorDTO: IElevatorDTO[]}>;
      if (elevatorOrError.isFailure) {
        return res.status(402).send(elevatorOrError.errorValue());
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.status(201).json( elevatorDTO );
    }
    catch (e) {
      return next(e);
    }
  }*/
}