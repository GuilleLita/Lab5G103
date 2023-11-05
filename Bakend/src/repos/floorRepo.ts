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
    @Inject('floorSchema') private floorSchema : Model<IFloorPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (floorId: FloorId | string): Promise<boolean> {

    const idX = floorId instanceof FloorId ? (<FloorId>floorId).id.toValue() : FloorId;

    const query = { floorId: idX}; 
    const FloorDocument = await this.floorSchema.findOne( query );

    return !!FloorDocument === true;
  }

  public async save (floor: Floor): Promise<Floor> {
    const query = { floorId: floor.id.toString() }; 

    const FloorDocument = await this.floorSchema.findOne( query );

    try {
      if (FloorDocument === null ) {
        const rawFloor: any = FloorMap.toPersistence(floor);

        const FloorCreated = await this.floorSchema.create(rawFloor);

        return FloorMap.toDomain(FloorCreated);
      }else {
        FloorDocument.floorName = floor.name;
        FloorDocument.description = floor.description;
        FloorDocument.buildingCode = floor.buildingCode;
        FloorDocument.height = floor.height;
        FloorDocument.width= floor.width;
        FloorDocument.rooms= floor.rooms;
        FloorDocument.grid= floor.grid;

        await FloorDocument.save();

        return floor;
      }
    } catch (err) {
      throw err;
    }
  }



  public async findById (floorId: FloorId | string): Promise<Floor> {

    const idX = floorId instanceof FloorId ? (<FloorId>floorId).id.toValue() : FloorId;

    const query = { domainId: idX }; 
    const FloorRecord = await this.floorSchema.findOne( query );

    if( FloorRecord != null) {
      return FloorMap.toDomain(FloorRecord);
    }
    else
      return null;
  }

  public async findByName (floorName: string): Promise<Floor> {
    const query = { floorName: floorName };
    const floorRecord = await this.floorSchema.findOne( query );

    if( floorRecord != null) {
      return FloorMap.toDomain(floorRecord);
    }
    else
      return null;
  }

  public async findByBuildingCode (buildingCode: string): Promise<Floor[]> {
    const query = { buildingCode: buildingCode };
    const floorRecord = await this.floorSchema.find( query );
    const floorArray: Floor[] = [];
    if( floorRecord.length > 0) {
      for(let i = 0; i < floorRecord.length; i++){
        floorArray.push(await FloorMap.toDomain(floorRecord[i]));
      }
      return floorArray;  
    }
    else
      return null;
  }
}