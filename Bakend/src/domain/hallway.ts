import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { HallwayId } from "./hallwayId";
import { Guard } from "../core/logic/Guard";


import {IHallwayDTO} from "../dto/IHallwayDTO";

interface HallwayProps {
    hallwayId: string;
    buildingsId: string[];
    floorId: string;
}

export class Hallway extends AggregateRoot<HallwayProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get buildingsId (): string[] {
    return this.props.buildingsId;
  }

  get floorId() : string{
    return this.props.floorId;
  }

  private constructor (props: HallwayProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: HallwayProps, id?: UniqueEntityID): Result<Hallway> {

    const guardedProps = [
      { argument: props.hallwayId, argumentName: 'hallwayId' },
      { argument: props.buildingsId, argumentName: 'buildingsId' },
      { argument: props.floorId, argumentName: 'floorId' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Hallway>(guardResult.message)
    }

      const hallway = new Hallway({ ...props }, id);
      return Result.ok<Hallway>( hallway )
    
  }
}
