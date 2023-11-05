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
    const query = { elevatorId: elevator.id.toString() }; 

    const ElevatorDocument = await this.elevatorSchema.findOne( query );

    try {
      if (ElevatorDocument === null ) {
        const rawElevator: any = ElevatorMap.toPersistence(elevator);

        const ElevatorCreated = await this.elevatorSchema.create(rawElevator);

        return ElevatorMap.toDomain(ElevatorCreated);
      }else {
        ElevatorDocument.buildingId = elevator.buildingId;
        ElevatorDocument.floorId = elevator.floorId;
        ElevatorDocument.position = elevator.position;
        await ElevatorDocument.save();
        return elevator;
      }
    } catch (err) {
      throw err;
    }
  }



  public async findById (elevatorId: ElevatorId | string): Promise<Elevator> {

    const idX = elevatorId instanceof ElevatorId ? (<ElevatorId>elevatorId).id.toValue() : elevatorId;

    const query = { elevatorId: idX }; 
    const ElevatorRecord = await this.elevatorSchema.findOne( query );

    if( ElevatorRecord != null) {
      return ElevatorMap.toDomain(ElevatorRecord);
    }
    else
      return null;
  }

  public async findByBuildingCode (buildingCode: string): Promise<Elevator[]> {
      
      const query = { buildingId: buildingCode }; 
      const ElevatorRecord = await this.elevatorSchema.find( query );

      const Elevators: Elevator[] = []
      console.log(ElevatorRecord);
      if( ElevatorRecord.length > 0) {
        for (var i = 0; i < ElevatorRecord.length; i++) {
          Elevators.push(await ElevatorMap.toDomain(ElevatorRecord[i]));
        }
        return Elevators;
      }
      else
        return null;
    }
}