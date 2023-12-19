import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import { Building } from "../domain/building";
import { BuildingId } from "../domain/buildingId";

import { BuildingMap } from "../mappers/BuildingMap";

@Service()
export default class BuildingRepo implements IBuildingRepo {
  private models: any;

  constructor(
    @Inject('buildingSchema') private buildingSchema : Model<IBuildingPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (buildingCode: Building | string): Promise<boolean> {

    const idX = buildingCode instanceof Building ? (<Building>buildingCode).buildingCode : buildingCode;

    const query = { buildingCode: idX}; 
    const BuildingDocument = await this.buildingSchema.findOne( query );

    return !!BuildingDocument === true;
  }

  public async save (building: Building): Promise<Building> {
    const query = { buildingCode: building.buildingCode }; 

    const BuildingDocument = await this.buildingSchema.findOne( query );

    try {
      if (BuildingDocument === null ) {
        const rawBuilding: any = BuildingMap.toPersistence(building);

        const BuildingCreated = await this.buildingSchema.create(rawBuilding);

        return BuildingMap.toDomain(BuildingCreated);
      }else {
        BuildingDocument.buildingName = building.name;
	      BuildingDocument.description = building.description;
        BuildingDocument.height = building.height;
        BuildingDocument.width= building.width;
        BuildingDocument.numOfFloors= building.numOfFloors;
	      BuildingDocument.floors= building.floors;
	      BuildingDocument.elevatorFloors= building.elevatorFloors;
        await BuildingDocument.save();

        return building;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByName (name:  string): Promise<Building> {
    const query = { buildingName: name.toString() };
    const buildingRecord = await this.buildingSchema.findOne( query );

    if( buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    }
    else
      return null;
  }


  public async findByCode (buildingCode:  string): Promise<Building> {

    const idX = buildingCode;

    const query = { buildingCode: idX }; 
    const BuildingRecord = await this.buildingSchema.findOne( query );

    if( BuildingRecord != null) {

      return BuildingMap.toDomain(BuildingRecord);
    }
    else{

      return null;
    }
      
  }

  public async getAll (): Promise<Building[]> {
    const BuildingRecord = await this.buildingSchema.find();
    const BuildingArray : Building[] = [];
    if( BuildingRecord != null) {
      for(var i=0; i< BuildingRecord.length; i++){
      BuildingArray.push( await BuildingMap.toDomain(BuildingRecord[i]));
      }

      return BuildingArray;
    }
    else
      return null;
  }

  public async getBuildingsByMinMax(min: number, max: number): Promise<Building[]> {
    const query = { numOfFloors: { $gte: min, $lte: max } }; 
    const BuildingRecord = await this.buildingSchema.find( query );
    const BuildingArray : Building[] = [];
    if( BuildingRecord.length > 0) {
      for(var i=0; i< BuildingRecord.length; i++){
      BuildingArray.push( await BuildingMap.toDomain(BuildingRecord[i]));
      }

      return BuildingArray;
    }
    else
      return null;
  }
}