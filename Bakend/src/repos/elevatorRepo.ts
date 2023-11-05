import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';
import IElevatorRepo from "../services/IRepos/IElevatorRepo";
import { Elevator } from "../domain/elevator";
import { ElevatorId } from "../domain/elevatorId";

import { ElevatorMap } from "../mappers/ElevatorMap";

@Service()
export default class ElevatorRepo implements IElevatorRepo {
  private models: any;

  constructor(
    @Inject('elevatorSchema') private elevatorSchema : Model<IElevatorPersistence & Document>,
    @Inject('logger') private logger
  ) { }
  findByBuildingCode(code: string): Promise<Elevator[]> {
    throw new Error('Method not implemented.');
  }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (elevatorId: ElevatorId | string): Promise<boolean> {

    const idX = elevatorId instanceof ElevatorId ? (<ElevatorId>elevatorId).id.toValue() : ElevatorId;

    const query = { domainId: idX}; 
    const ElevatorDocument = await this.elevatorSchema.findOne( query );

    return !!ElevatorDocument === true;
  }

  public async save (elevator: Elevator): Promise<Elevator> {
    const query = { domainId: elevator.id.toString() }; 

    const ElevatorDocument = await this.elevatorSchema.findOne( query );

    try {
      if (ElevatorDocument === null ) {
        const rawElevator: any = ElevatorMap.toPersistence(elevator);

        const ElevatorCreated = await this.elevatorSchema.create(rawElevator);

        return ElevatorMap.toDomain(ElevatorCreated);
      }/*else {
        BuildingDocument.firstName = building.firstName;
        BuildingDocument.lastName = building.lastName;
        await BuildingDocument.save();

        return building;
      }*/
    } catch (err) {
      throw err;
    }
  }



  public async findById (elevatorId: ElevatorId | string): Promise<Elevator> {

    const idX = elevatorId instanceof ElevatorId ? (<ElevatorId>elevatorId).id.toValue() : ElevatorId;

    const query = { domainId: idX }; 
    const ElevatorRecord = await this.elevatorSchema.findOne( query );

    if( ElevatorRecord != null) {
      return ElevatorMap.toDomain(ElevatorRecord);
    }
    else
      return null;
  }
}