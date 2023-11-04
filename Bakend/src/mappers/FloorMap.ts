import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IFloorDTO} from "../dto/IFloorDTO";

import { Floor } from "../domain/floor";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


import RoleRepo from "../repos/roleRepo";

export class FloorMap extends Mapper<Floor> {

  public static toDTO( Floor: Floor): IFloorDTO {
    return {
      //floorId: Floor.id.toString(),
        floorName: Floor.name,
        description:  Floor.description,
        buildingCode: Floor.buildingCode,
        height: Floor.height,
        width:  Floor.width,
        rooms: Floor.rooms,
        grid: Floor.grid
        
    } as IFloorDTO
  }

  public static async toDomain (raw: any): Promise<Floor> {

    const floorOrError = Floor.create({
      floorName: raw.floorName,
      description:  raw.description,
      buildingCode: raw.buildingCode,
      height: raw.height,
      width:  raw.width,
      rooms: raw.rooms,
      grid: raw.grid
      }, new UniqueEntityID(raw.floorId))
    floorOrError.isFailure ? console.log(floorOrError.error) : '';
    return floorOrError.isSuccess ? floorOrError.getValue() : null;
  }

  public static toPersistence (floor: Floor): any {
    const a = {
        floorId: floor.id.toString(),
        floorName: floor.name,
        description:  floor.description,
        buildingCode: floor.buildingCode,
        height: floor.height,
        width:  floor.width,
        rooms: floor.rooms,
        grid: floor.grid
    }
    return a;
  }
}