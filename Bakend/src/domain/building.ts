import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { RoleId } from "./roleId";
import { Guard } from "../core/logic/Guard";


import {IBuildingDTO} from "../dto/IBuildingDTO";

interface BuildingProps {
  buildingId: string;
	buildingName: string;
	description: string;
	height: number;
	width: number;
	numOfFloors: number;
	floors: string[];
	elevatorFloors : string[];
}

export class Building extends AggregateRoot<BuildingProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get roleId (): RoleId {
    return new RoleId(this.roleId.toValue());
  }

  get name (): string {
    return this.props.buildingName;
  }

  get description() : string{
    return this.props.description;
  }

  get height() : number{
    return this.props.height;
  }
  get width() : number{
    return this.props.width;
  }
  get numOfFloors() : number{
    return this.props.numOfFloors;
  }
  get floors() : string[]{
    return this.props.floors;
  }
  get elevatorFloors() : string[]{
    return this.props.elevatorFloors;
  }

  set name ( value: string) {
    this.props.buildingName = value;
  }
  private constructor (props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: BuildingProps, id?: UniqueEntityID): Result<Building> {

    const guardedProps = [
      { argument: props.buildingName, argumentName: 'buildingName' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.height, argumentName: 'height' },
      { argument: props.width, argumentName: 'width' },
      { argument: props.numOfFloors, argumentName: 'numOfFloors'},
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Building>(guardResult.message)
    }

      const role = new Building({ ...props }, id);
      return Result.ok<Building>( role )
    
  }
}
