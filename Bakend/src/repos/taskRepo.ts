import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { ITaskPersistence } from '../dataschema/ITaskPersistence';
import ITaskRepo from "../services/IRepos/ITaskRepo";
import { Task } from "../domain/task";
import { TaskId } from "../domain/taskId";

import { TaskMap } from "../mappers/TaskMap";

@Service()
export default class TaskRepo implements ITaskRepo {
  private models: any;

  constructor(
    @Inject('taskSchema') private taskSchema : Model<ITaskPersistence & Document>,
    @Inject('logger') private logger
  ) { }


  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (taskId: TaskId | string): Promise<boolean> {

    const idX = taskId instanceof TaskId ? (<TaskId>taskId).id.toValue() : taskId;

    const query = { taskId: idX}; 
    const TaskDocument = await this.taskSchema.findOne( query );

    return !!TaskDocument === true;
  }

  public async save (task: Task): Promise<Task> {
    const query = { taskId: task.id.toString() }; 

    const TaskDocument = await this.taskSchema.findOne( query );

    try {
      if (TaskDocument === null ) {
        const rawTask: any = TaskMap.toPersistence(task);

        const TaskCreated = await this.taskSchema.create(rawTask);

        return TaskMap.toDomain(TaskCreated);
      }else {
        TaskDocument.taskName = task.taskName;
        TaskDocument.buildingsCode = task.buildingsCode;
        TaskDocument.floorsId = task.floorsId;
        TaskDocument.initialPoint = task.initialPoint;
        TaskDocument.destinationPoint = task.destinationPoint;
        TaskDocument.status = task.status;
        await TaskDocument.save();
        return task;
      }
    } catch (err) {
      throw err;
    }
  }



  public async findById (taskId: TaskId | string): Promise<Task> {

    const idX = taskId instanceof TaskId ? (<TaskId>taskId).id.toValue() : taskId;

    const query = { taskId: idX }; 
    const TaskRecord = await this.taskSchema.findOne( query );

    if( TaskRecord != null) {
      return TaskMap.toDomain(TaskRecord);
    }
    else
      return null;
  }
/*
  public async findByBuildingCode (buildingCode: string): Promise<Elevator[]> {
      
      const query = { buildingId: buildingCode }; 
      const ElevatorRecord = await this.elevatorSchema.find( query );

      const Elevators: Elevator[] = []
      console.log(ElevatorRecord);
      if( ElevatorRecord.length > 0) {
        for (var i = 0; i < ElevatorRecord.length; i++) {
          Elevators.push(await ElevatorMap.toDomain(ElevatorRecord[i]));
        }
        return Elevators;
      }
      else
        return null;
    }

    public async existsInFloor(name: string): Promise<boolean> {
      const query = { floorId: name };
      console.log(query);
      const floorRecord =await this.elevatorSchema.findOne( query );

      if( floorRecord != null) {
        return true;
      }
      else
        return false;
  }*/
}