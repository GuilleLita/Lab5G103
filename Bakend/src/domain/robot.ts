import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";


import { IRobotDTO } from "../dto/IRobotDTO";
import { RobotId } from "./robotId";

interface RobotProps {
	robotId: string;
	robotType: string;
  mark: string;
  model: string;
	taskspermited: string[];
  currentlytask: string;
  destinationPosition: string[];
	status: string;	//you can inhibit, being working, stop...
  }

export class Robot extends AggregateRoot<RobotProps> {
  taskspermited: any;
  get id (): UniqueEntityID {
    return this._id;
  }

  get robotType (): string {
    return this.props.robotType;
  }

  get mark() : string{
    return this.props.mark;
  }

  get model() : string{
    return this.props.model;
  }
  get taskpermited() : string[]{
    return this.props.taskspermited;
  }
  get currentlytask() : string{
    return this.props.currentlytask;
  }
  get destinationPosition() : string[]{
    return this.props.destinationPosition;
  }
  get status() : string{
    return this.props.status;
  }

  set robotType ( value: string) {
    this.props.robotType = value;
  }

  set mark ( value: string) {
    this.props.mark = value;
  }

  set model ( value: string) {
    this.props.model = value;
  }

  set taskpermited ( value: string[]) {
    this.props.taskspermited = value;
  }

  set currentlytask ( value: string) {
    this.props.currentlytask = value;
  }

  set destinationPosition ( value: string[]) {
    this.props.destinationPosition = value;
  }

  set status ( value: string) {
    this.props.status = value;
  }

  private constructor (props: RobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: RobotProps, id?: UniqueEntityID): Result<Robot> {

    

    const guardedProps = [
      { argument: props.robotType, argumentName: 'robotType' },
      { argument: props.mark, argumentName: 'mark' },
      { argument: props.model, argumentName: 'model' },
      { argument: props.taskspermited, argumentName: 'taskspermited' },
      { argument: props.currentlytask, argumentName: 'currentlytask'},
      { argument: props.destinationPosition, argumentName: 'destinationPosition'},
      { argument: props.status, argumentName: 'status'}
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Robot>(guardResult.message)
    }

      const role = new Robot({ ...props }, id);
      return Result.ok<Robot>( role )
    
  }
}
