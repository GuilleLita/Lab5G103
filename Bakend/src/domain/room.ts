import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { RoomId } from "./roomId";
import { Guard } from "../core/logic/Guard";


import {IRoomDTO} from "../dto/IRoomDTO";

interface RoomProps {
    roomId: string;
    buildingsId: string;
    floorId: string;
    position: number[];
}

export class Room extends AggregateRoot<RoomProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get buildingsId (): string {
    return this.props.buildingsId;
  }

  get floorId() : string{
    return this.props.roomId;
  }

  get position() : number[]{
    return this.props.position;
  }

  private constructor (props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: RoomProps, id?: UniqueEntityID): Result<Room> {

    const guardedProps = [
      { argument: props.roomId, argumentName: 'roomId' },
      { argument: props.buildingsId, argumentName: 'buildingsId' },
      { argument: props.floorId, argumentName: 'floorId' },
      { argument: props.position, argumentName: 'position' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Room>(guardResult.message)
    }

      const room = new Room({ ...props }, id);
      return Result.ok<Room>( room )
    
  }
}
