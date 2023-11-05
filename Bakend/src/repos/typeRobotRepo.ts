import { Service, Inject } from 'typedi';

import ITypeRobotRepo from "../services/IRepos/ITypeRobotRepo";
import { TypeRobot } from "../domain/typerobot";
import { TypeRobotMap } from "../mappers/TypeRobotMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { ITypeRobotPersistence } from '../dataschema/ITypeRobotPersistence';

@Service()
export default class TypeRobotRepo implements ITypeRobotRepo {
  private models: any;

  constructor(
    @Inject('typerobotSchema') private typerobotSchema : Model<ITypeRobotPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists( typerobot: TypeRobot): Promise<boolean> {
    const robotType = typerobot.robotType; // Obtén el valor del atributo robotType desde el objeto role

    // Construye la consulta utilizando robotType en lugar de id
    const query = { robotType: robotType }; 

    // Realiza la búsqueda utilizando el atributo robotType
    const typerobotDocument = await this.typerobotSchema.findOne(query as FilterQuery<ITypeRobotPersistence & Document>);

    return !!typerobotDocument === true;
}


  public async save (typerobot: TypeRobot): Promise<TypeRobot> {
    const query = { robotType: typerobot.robotType}; 

    const typerobotDocument = await this.typerobotSchema.findOne( query );

    try {
      if (typerobotDocument === null ) {
        const rawTypeRobot: any = TypeRobotMap.toPersistence(typerobot);
        const typerobotCreated = await this.typerobotSchema.create(rawTypeRobot);

        return TypeRobotMap.toDomain(typerobotCreated);
      } else {
        typerobotDocument.mark = typerobot.mark;
        typerobotDocument.model = typerobot.model;
        typerobotDocument.taskspermited = typerobot.taskspermited;
        await typerobotDocument.save();

        return typerobot;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByrobotType (robotType:  string): Promise<TypeRobot> {

    const idX = robotType;

    const query = { robotType: idX }; 
    const TypeRobotRecord = await this.typerobotSchema.findOne( query );

    if( TypeRobotRecord != null) {
      return TypeRobotMap.toDomain(TypeRobotRecord);
    }
    else
      return null;
  }
}