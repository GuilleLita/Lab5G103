import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITypeRobotPersistence } from '../dataschema/ITypeRobotPersistence';

import ITypeRobotDTO from "../dto/ITypeRobotDTO";
import { TypeRobot } from "../domain/typerobot";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class TypeRobotMap extends Mapper<TypeRobot> {
  
  public static toDTO( typerobot: TypeRobot): ITypeRobotDTO {
    return {
      robotType: typerobot.robotType,
      mark: typerobot.mark,
      model: typerobot.model
    } as ITypeRobotDTO;
  }

  public static toDomain (typerobot: any | Model<ITypeRobotPersistence & Document> ): TypeRobot {
    const typerobotOrError = TypeRobot.create(
      typerobot,
      new UniqueEntityID(typerobot.domainId)
    );

    typerobotOrError.isFailure ? console.log(typerobotOrError.error) : '';

    return typerobotOrError.isSuccess ? typerobotOrError.getValue() : null;
  }

  public static toPersistence (typerobot: TypeRobot): any {
    return {
      robotType: typerobot.robotType,
      mark: typerobot.mark,
      model: typerobot.model
    }
  }
}