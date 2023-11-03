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
    //const userEmailOrError = UserEmail.create(raw.email);
    //const userPasswordOrError = UserPassword.create({value: raw.password, hashed: true});
    //const repo = Container.get(RoleRepo);
    //const role = await repo.findByDomainId(raw.role);

    //const userOrError = Building.create({

    //}, new UniqueEntityID(raw.domainId))

    //userOrError.isFailure ? console.log(userOrError.error) : '';
    
    //return userOrError.isSuccess ? userOrError.getValue() : null;
    return null;
  }

  public static toPersistence (elevator: Elevator): any {
    const a = {
        ElevatorId: elevator.id.toString(),
	    buildingsId: elevator.buildingId,
	    floorId:  elevator.floorId,
      position: elevator.position
    }
    return a;
  }
}