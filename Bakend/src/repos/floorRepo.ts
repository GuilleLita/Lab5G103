import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import IFloorRepo from "../services/IRepos/IFloorRepo";
import { Floor } from "../domain/floor";
import { FloorId } from "../domain/floorId";

import { FloorMap } from "../mappers/FloorMap";

@Service()
export default class FloorRepo implements IFloorRepo {
  private models: any;

  constructor(
    @Inject('floorSchema') private FloorSchema : Model<IFloorPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (floorId: FloorId | string): Promise<boolean> {

    const idX = floorId instanceof FloorId ? (<FloorId>floorId).id.toValue() : FloorId;

    const query = { domainId: idX}; 
    const FloorDocument = await this.FloorSchema.findOne( query );

    return !!FloorDocument === true;
  }

  public async save (floor: Floor): Promise<Floor> {
    const query = { domainId: floor.id.toString() }; 

    const FloorDocument = await this.FloorSchema.findOne( query );

    try {
      if (FloorDocument === null ) {
        const rawFloor: any = FloorMap.toPersistence(floor);

        const FloorCreated = await this.FloorSchema.create(rawFloor);

        return FloorMap.toDomain(FloorCreated);
      }/*else {
        FloorDocument.firstName = Floor.firstName;
        FloorDocument.lastName = Floor.lastName;
        await FloorDocument.save();

        return Floor;
      }*/
    } catch (err) {
      throw err;
    }
  }



  public async findById (floorId: FloorId | string): Promise<Floor> {

    const idX = floorId instanceof FloorId ? (<FloorId>floorId).id.toValue() : FloorId;

    const query = { domainId: idX }; 
    const FloorRecord = await this.FloorSchema.findOne( query );

    if( FloorRecord != null) {
      return FloorMap.toDomain(FloorRecord);
    }
    else
      return null;
  }
}