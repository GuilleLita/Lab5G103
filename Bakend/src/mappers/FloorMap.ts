import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IFloorDTO} from "../dto/IFloorDTO";

import { Floor } from "../domain/floor";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


import RoleRepo from "../repos/roleRepo";

export class FloorMap extends Mapper<Floor> {

  public static toDTO( Floor: Floor): IFloorDTO {
    return {
      floorId: Floor.id.toString(),
        floorName: Floor.name,
        description:  Floor.description,
        height: Floor.height,
        width:  Floor.width,
        rooms: Floor.rooms,
        grid: Floor.grid
        
    } as IFloorDTO
  }

  public static async toDomain (raw: any): Promise<Floor> {
    //const userEmailOrError = UserEmail.create(raw.email);
    //const userPasswordOrError = UserPassword.create({value: raw.password, hashed: true});
    //const repo = Container.get(RoleRepo);
    //const role = await repo.findByDomainId(raw.role);

    //const userOrError = Floor.create({

    //}, new UniqueEntityID(raw.domainId))

    //userOrError.isFailure ? console.log(userOrError.error) : '';
    
    //return userOrError.isSuccess ? userOrError.getValue() : null;
    return null;
  }

  public static toPersistence (Floor: Floor): any {
    const a = {
        floorId: Floor.id.toString(),
        floorName: Floor.name,
        description:  Floor.description,
        height: Floor.height,
        width:  Floor.width,
        rooms: Floor.rooms,
        grid: Floor.grid
    }
    return a;
  }
}