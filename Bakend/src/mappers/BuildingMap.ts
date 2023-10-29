import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IBuildingDTO} from "../dto/IBuildingDTO";

import { Building } from "../domain/building";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/userEmail";
import { UserPassword } from "../domain/userPassword";

import RoleRepo from "../repos/roleRepo";

export class BuildingMap extends Mapper<Building> {

  public static toDTO( building: Building): IBuildingDTO {
    return {
      buildingId: building.id.toString(),
	    buildingName: building.name,
	    description:  building.description,
	    height: building.height,
	    width:  building.width,
	    numOfFloors: building.numOfFloors,
	    floors: building.floors,
	    elevatorFloors : building.elevatorFloors
    } as IBuildingDTO
  }

  public static async toDomain (raw: any): Promise<Building> {
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

  public static toPersistence (building: Building): any {
    const a = {
      buildingId: building.id.toString(),
	    buildingName: building.name,
	    description:  building.description,
	    height: building.height,
	    width:  building.width,
	    numOfFloors: building.numOfFloors,
	    floors: building.floors,
	    elevatorFloors : building.elevatorFloors
    }
    return a;
  }
}