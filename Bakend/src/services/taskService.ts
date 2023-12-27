import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
//import MailerService from './mailer.ts.bak';

import ITaskService from './IServices/ITaskService';
import { TaskMap } from "../mappers/TaskMap";
import { ITaskDTO } from '../dto/ITaskDTO';

import ITaskRepo from './IRepos/ITaskRepo';

import { Task } from '../domain/task';


import { Result } from "../core/logic/Result";

@Service()
export default class TaskService implements ITaskService{
  constructor(
      @Inject(config.repos.task.name) private taskRepo : ITaskRepo,
      @Inject('logger') private logger,
  ) {}

  public async CreateTask(taskDTO: ITaskDTO): Promise<Result<{ taskDTO: ITaskDTO; }>> {
    try{
      const taskDocument = await this.taskRepo.findById( taskDTO.taskId );
      const found = !!taskDocument;

      if (found) {
        return Result.fail<{taskDTO: ITaskDTO, token: string}>("Task already exists with id=" + taskDTO.taskId);
      }

      const TaskOrError = await Task.create({
        //elevatorId: elevatorDTO.elevatorId,
        taskName: taskDTO.taskName,
        buildingsCode: taskDTO.buildingsCode,
          floorsId: taskDTO.floorsId,
        initialPoint: taskDTO.initialPoint,
        destinationPoint: taskDTO.destinationPoint,
        status: taskDTO.status
        });

        if (TaskOrError.isFailure) {
          throw Result.fail<ITaskDTO>(TaskOrError.errorValue());
        }

      
      const TaskResult = TaskOrError.getValue();
      await this.taskRepo.save(TaskResult);
      const TaskDTOResult = TaskMap.toDTO( TaskResult ) as ITaskDTO;
      return Result.ok<{taskDTO: ITaskDTO}>( {taskDTO: TaskDTOResult} )
      }
      catch (e) {
        throw e;
      }
}

public async updateTaskStatus(taskId: string, newStatus: string): Promise<Result<{ taskDTO: ITaskDTO }>> {
  try {
      const task = await this.taskRepo.findById(taskId);

      if (!task) {
          return Result.fail<{ taskDTO: ITaskDTO }>(`Task not found with id=${taskId}`);
      }

      task.status = newStatus;

      await this.taskRepo.save(task);

      const updatedTaskDTO = TaskMap.toDTO(task) as ITaskDTO;

      return Result.ok<{ taskDTO: ITaskDTO }>({ taskDTO: updatedTaskDTO });
  } catch (error) {
      throw error;
  }
}


  public async updateTask(taskDTO: ITaskDTO): Promise<Result<{ taskDTO: ITaskDTO; }>>  {
    try {
      const Task = await this.taskRepo.findById(taskDTO.taskId);
      const found = !!Task === true;

      if (!found) {
        return Result.fail<{taskDTO: ITaskDTO}>("task not found with id=" + taskDTO.taskId);
      }
      Task.taskName = taskDTO.taskName;
      Task.buildingsCode= taskDTO.buildingsCode,
      Task.floorsId= taskDTO.floorsId,
      Task.initialPoint = taskDTO.initialPoint;
      Task.destinationPoint = taskDTO.destinationPoint;
      Task.status = taskDTO.status;

      await this.taskRepo.save(Task);
      const TaskDTOResult = TaskMap.toDTO( Task ) as ITaskDTO;
      return Result.ok<{taskDTO: ITaskDTO}>( {taskDTO: TaskDTOResult} )
    } catch (e) {
      throw e;
    }
  }
  public async getTaskId(): Promise<Result<{ taskDTO: ITaskDTO[]; }>>  {
    try {
      const Tasks = await this.taskRepo.getAll();

      if (Task === null) {
        return Result.fail<{taskDTO: ITaskDTO[]}>("Task not found");
      }
      else {
        const TasksDTOResult = Tasks.map( Task => TaskMap.toDTO( Task ) as ITaskDTO );
        return Result.ok<{taskDTO: ITaskDTO[]}>( {taskDTO: TasksDTOResult} )
        }
    } catch (e) {
      throw e;
    }
  }
  public async getTasksByStatus(status: string): Promise<Result<{ taskDTO: ITaskDTO[]; }>>  {
    try {
      const Tasks = await this.taskRepo.findStatus(status);
      const found = !!Tasks ;

      if (!found) {
        return Result.fail<{taskDTO: ITaskDTO[]}>("Task not found with status=" + status);
      }

      const TaskDTOResult = Tasks.map( Task => TaskMap.toDTO( Task ) as ITaskDTO);
      return Result.ok<{taskDTO: ITaskDTO[]}>( {taskDTO: TaskDTOResult} )
    } catch (e) {
      throw e;
    }
  }
/*
  public async getElevatorsByBuilding(buildingCode: string): Promise<Result<{ elevatorDTO: IElevatorDTO[]; }>>  {
    try {
      const Elevators = await this.elevatorRepo.findByBuildingCode(buildingCode);
      const found = !!Elevators ;

      if (!found) {
        return Result.fail<{elevatorDTO: IElevatorDTO[]}>("elevator not found with buildingCode=" + buildingCode);
      }

      const ElevatorDTOResult = Elevators.map( Elevator => ElevatorMap.toDTO( Elevator ) as IElevatorDTO);
      return Result.ok<{elevatorDTO: IElevatorDTO[]}>( {elevatorDTO: ElevatorDTOResult} )
    } catch (e) {
      throw e;
    }
  }*/



  


}
