import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IHallwayDTO} from "../dto/IHallwayDTO";

import { Hallway } from "../domain/hallway";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class HallwayMap extends Mapper<Hallway> {

  public static toDTO( hallway: Hallway): IHallwayDTO {
    return {
        hallwayId: hallway.id.toString(),
	    buildingsId: hallway.buildingsId,
	    floorId:  hallway.floorId,
    } as IHallwayDTO
  }

  public static async toDomain (raw: any): Promise<Hallway> {
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

  public static toPersistence (hallway: Hallway): any {
    const a = {
        hallwayId: hallway.id.toString(),
	    buildingsId: hallway.buildingsId,
	    floorId:  hallway.floorId,
    }
    return a;
  }
}