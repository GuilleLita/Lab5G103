import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { FloorId } from "./floorId";
import { Guard } from "../core/logic/Guard";


//import {IBuildingDTO} from "../dto/IBuildingDTO";

interface FloorProps {
    floorName: string;
    description: string;
    buildingCode: string;
    height: number;
    width: number;
    rooms: string[];
    grid: number[][];
}

export class Floor extends AggregateRoot<FloorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get floorId (): FloorId {
    return FloorId.caller(this.id)
  }
  get name (): string {
    return this.props.floorName;
  }

  get description() : string{
    return this.props.description;
  }

  get buildingCode() : string{
    return this.props.buildingCode;
  }

  get height() : number{
    return this.props.height;
  }
  get width() : number{
    return this.props.width;
  }

  get rooms() : string[]{
    return this.props.rooms;
  }

  get grid() : number[][]{
    /*
        GRID:
        -------------------------------
        Number |   0   |  N  |  Porta
           1   |  yes  | yes |  yes
           2   |  yes  | yes |  no
           3   |  yes  | no  |  yes
           4   |  yes  | no  |  no
           5   |  no   | yes |  yes
           6   |  no   | yes |  no
           7   |  no   | no  |  yes
           8   |  no   | no  |  no
        -------------------------------
    */

    return this.props.grid;
  }

  set name ( value: string) {
    this.props.floorName = value;
  }

  set description ( value: string) {
    this.props.description = value;
  }

  set buildingCode ( value: string) {
    this.props.buildingCode = value;
  }

  set height ( value: number) {
    this.props.height = value;
  }

  set width ( value: number) {
    this.props.width = value;
  }

  set rooms ( value: string[]) {
    this.props.rooms = value;
  }

  set grid ( value: number[][]) {
    this.props.grid = value;
  }


  private constructor (props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: FloorProps, id?: UniqueEntityID): Result<Floor> {

    const guardedProps = [
      { argument: props.floorName, argumentName: 'floorName' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.buildingCode, argumentName: 'buildingCode' },
      { argument: props.height, argumentName: 'height' },
      { argument: props.width, argumentName: 'width' },
      { argument: props.rooms, argumentName: 'rooms' },
        { argument: props.grid, argumentName: 'grid' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Floor>(guardResult.message)
    }

      const role = new Floor({ ...props }, id);
      return Result.ok<Floor>( role )
    
  }
}
