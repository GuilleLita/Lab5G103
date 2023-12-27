import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {ITaskDTO} from "../dto/ITaskDTO";

import { Task } from "../domain/task";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class TaskMap extends Mapper<Task> {

  public static toDTO( task: Task): ITaskDTO {
    return {
      taskId: task.id.toString(),
	    taskName: task.taskName,
      buildingsCode: task.buildingsCode,
	    floorsId:  task.floorsId,
	    initialPoint:  task.initialPoint,
      destinationPoint: task.destinationPoint,
      status: task.status
    } as ITaskDTO
  }

  public static async toDomain (raw: any): Promise<Task> {
    const taskOrError = Task.create({
      taskName: raw.taskName,
      buildingsCode: raw.buildingsCode,
	    floorsId:  raw.floorsId,
	    initialPoint:  raw.initialPoint,
      destinationPoint: raw.destinationPoint,
      status: raw.status
      }, new UniqueEntityID(raw.taskId))
    taskOrError.isFailure ? console.log(taskOrError.error) : '';
    return taskOrError.isSuccess ? taskOrError.getValue() : null;
  }

  public static toPersistence (task: Task): any {
    const a = {
      taskId: task.id.toString(),
      taskName: task.taskName,
      buildingsCode: task.buildingsCode,
	    floorsId:  task.floorsId,
	    initialPoint:  task.initialPoint,
      destinationPoint: task.destinationPoint,
      status: task.status
    }
    return a;
  }
}