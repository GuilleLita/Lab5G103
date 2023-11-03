import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IBuildingDTO} from "../dto/IBuildingDTO";

import { Building } from "../domain/building";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


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
    //const buildingEmailOrError = buildingEmail.create(raw.email);
    //const buildingPasswordOrError = buildingPassword.create({value: raw.password, hashed: true});
    //const repo = Container.get(RoleRepo);
    //const role = await repo.findByDomainId(raw.role);

    const buildingOrError = Building.create({
      buildingId: raw.buildingId,
      buildingName: raw.buildingName,
      description:  raw.description,
      height: raw.height,
      width:  raw.width,
      numOfFloors: raw.numOfFloors,
      floors: raw.floors,
      elevatorFloors : raw.elevatorFloors
    }, new UniqueEntityID(raw.buildingId))

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
    
    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
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