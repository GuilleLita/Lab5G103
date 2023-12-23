import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TaskId } from "./taskId";
import { Guard } from "../core/logic/Guard";


import {ITaskDTO} from "../dto/ITaskDTO";

interface TaskProps {
    
  taskName: string;
  buildingsCode: string[];
  floorsId: string[];
  initialPoint: number[];
  destinationPoint: number[];
  status: string;
}

export class Task extends AggregateRoot<TaskProps> {
get id (): UniqueEntityID {
  return this._id;
}

get taskName (): string {
  return this.props.taskName;
}
get buildingsCode (): string[] {
  return this.props.buildingsCode;
}

get floorsId() : string[]{
  return this.props.floorsId;
}
get intialPoint() : number[]{
  return this.props.initialPoint;
}

get destinationPoint() : number[]{
  return this.props.destinationPoint;
}
get status (): string {
  return this.props.status;
}

set taskName(value: string){
  this.props.taskName = value;
}
set floorsId(value: string[]){
  this.props.floorsId = value;
} 

set buildingsCode(value: string[]){
  this.props.buildingsCode = value;
}
set initialPoint(value: number[]){
  this.props.initialPoint = value;
}
set destinationPoint(value: number[]){
  this.props.destinationPoint = value;
}
set status(value: string){
  this.props.status = value;
}

private constructor (props: TaskProps, id?: UniqueEntityID) {
  super(props, id);
}

public static create (props: TaskProps, id?: UniqueEntityID): Result<Task> {

  const guardedProps = [
    //{ argument: props.TaskId, argumentName: 'TaskId' },
    { argument: props.taskName, argumentName: 'taskName' },
    { argument: props.buildingsCode, argumentName: 'buildingsCode' },
    { argument: props.floorsId, argumentName: 'floorsId' },
    { argument: props.initialPoint, argumentName: 'initialPoint' },
    { argument: props.destinationPoint, argumentName: 'destinationPoint' },
    { argument: props.status, argumentName: 'status' }
  ];

  const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

  if (!guardResult.succeeded) {
    return Result.fail<Task>(guardResult.message)
  }

    const task = new Task({ ...props }, id);
    return Result.ok<Task>( task )
  
}
}
