import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IRoomDTO} from "../dto/IRoomDTO";

import { Room } from "../domain/room";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RoomMap extends Mapper<Room> {

  public static toDTO( room: Room): IRoomDTO {
    return {
        roomId: room.id.toString(),
	    buildingsId: room.buildingsId,
	    floorId:  room.floorId,
      position: room.position
    } as IRoomDTO
  }

  public static async toDomain (raw: any): Promise<Room> {
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

  public static toPersistence (room: Room): any {
    const a = {
        RoomId: room.id.toString(),
	    buildingsId: room.buildingsId,
	    floorId:  room.floorId,
      position: room.position
    }
    return a;
  }
}