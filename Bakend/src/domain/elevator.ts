import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { ElevatorId } from "./elevatorId";
import { Guard } from "../core/logic/Guard";


import {IElevatorDTO} from "../dto/IElevatorDTO";

interface ElevatorProps {
    ElevatorId: string;
    buildingId: string;
    floorId: string;
    position: number[];
}

export class Elevator extends AggregateRoot<ElevatorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get buildingId (): string {
    return this.props.buildingId;
  }

  get floorId() : string{
    return this.props.floorId;
  }

  get position() : number[]{
    return this.props.position;
  }

  private constructor (props: ElevatorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {

    const guardedProps = [
      { argument: props.ElevatorId, argumentName: 'ElevatorId' },
      { argument: props.buildingId, argumentName: 'buildingId' },
      { argument: props.floorId, argumentName: 'floorId' },
      { argument: props.position, argumentName: 'position' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Elevator>(guardResult.message)
    }

      const elevator = new Elevator({ ...props }, id);
      return Result.ok<Elevator>( elevator )
    
  }
}
