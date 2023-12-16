import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IRoomDTO} from "../dto/IRoomDTO";

import { Room } from "../domain/room";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RoomMap extends Mapper<Room> {

  public static toDTO( room: Room): IRoomDTO {
    return {
      roomId: room.roomId,
	    buildingsId: room.buildingsId,
	    floorId:  room.floorId,
      position: room.position
    } as IRoomDTO
  }

  public static async toDomain(raw: any): Promise<Room> {
    return null;
  }

  public static toPersistence(room: Room): any {
    const a = {
      roomId: room.roomId,
      buildingsId: room.buildingsId,
      floorId: room.floorId,
      position: room.position
    };
    return a;
  }
}