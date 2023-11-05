import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IHallwayDTO} from "../dto/IHallwayDTO";

import { Hallway } from "../domain/hallway";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class HallwayMap extends Mapper<Hallway> {

  public static toDTO( hallway: Hallway): IHallwayDTO {
    return {
      hallwayId: hallway.id.toString(),
	    buildingsCode: hallway.buildingsCode,
	    floorsId:  hallway.floorsId,
      position: hallway.position
    } as IHallwayDTO
  }

  public static async toDomain (raw: any): Promise<Hallway> {
    const hallwayOrError = Hallway.create({
      buildingsCode: raw.buildingsCode,
      floorsId: raw.floorsId,
      position: raw.position

      }, new UniqueEntityID(raw.hallwayId))
    hallwayOrError.isFailure ? console.log(hallwayOrError.error) : '';
    return hallwayOrError.isSuccess ? hallwayOrError.getValue() : null;
  }

  public static toPersistence (hallway: Hallway): any {
    const a = {
      hallwayId: hallway.id.toString(),
	    buildingsCode: hallway.buildingsCode,
	    floorsId:  hallway.floorsId,
      position: hallway.position
    }
    return a;
  }
}