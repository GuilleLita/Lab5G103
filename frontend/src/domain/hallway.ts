import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { HallwayId } from "./hallwayId";
import { Guard } from "../core/logic/Guard";


import {IHallwayDTO} from "../dto/IHallwayDTO";

interface HallwayProps {
    //hallwayId: string;
    buildingsCode: string[];
    floorsId: string[];
    position: number[];
}

export class Hallway extends AggregateRoot<HallwayProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get hallwayId (): HallwayId {
    return HallwayId.caller(this.id)
  }

  get buildingsCode (): string[] {
    return this.props.buildingsCode;
  }

  get floorsId() : string[]{
    return this.props.floorsId;
  }

  get position() : number[]{
    return this.props.position;
  }

  set position(value: number[]){
    this.props.position = value;
  }

  set floorsId(value: string[]){
    this.props.floorsId = value;
  } 

  set buildingsCode(value: string[]){
    this.props.buildingsCode = value;
  }


  private constructor (props: HallwayProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: HallwayProps, id?: UniqueEntityID): Result<Hallway> {

    const guardedProps = [
      //{ argument: props.hallwayId, argumentName: 'hallwayId' },
      { argument: props.buildingsCode, argumentName: 'buildingsCode' },
      { argument: props.floorsId, argumentName: 'floorsId' },
      { argument: props.position, argumentName: 'position' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Hallway>(guardResult.message)
    }

      const hallway = new Hallway({ ...props }, id);
      return Result.ok<Hallway>( hallway )
    
  }
}
