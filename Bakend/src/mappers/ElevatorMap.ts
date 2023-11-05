import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IElevatorDTO} from "../dto/IElevatorDTO";

import { Elevator } from "../domain/elevator";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class ElevatorMap extends Mapper<Elevator> {

  public static toDTO( elevator: Elevator): IElevatorDTO {
    return {
      elevatorId: elevator.id.toString(),
	    buildingId: elevator.buildingId,
	    floorId:  elevator.floorId,
      position: elevator.position
    } as IElevatorDTO
  }

  public static async toDomain (raw: any): Promise<Elevator> {
    const elevatorOrError = Elevator.create({
      elevatorId: raw.id.toString(),
	    buildingId: raw.buildingId,
	    floorId:  raw.floorId,
      position: raw.position
      }, new UniqueEntityID(raw.floorId))
    elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';
    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
  }

  public static toPersistence (elevator: Elevator): any {
    const a = {
      elevatorId: elevator.id.toString(),
	    buildingsId: elevator.buildingId,
	    floorId:  elevator.floorId,
      position: elevator.position
    }
    return a;
  }
}